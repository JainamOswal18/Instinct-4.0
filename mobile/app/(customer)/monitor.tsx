// app/(customer)/monitor.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, ActivityIndicator, Dimensions,
  TextInput, KeyboardAvoidingView, Platform, FlatList, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { askGemini } from '../../services/gemini';

import { useCurrentProperty } from '../../store/useAuthStore';
import { useEnergyStore } from '../../store/useEnergyStore';
import { useEnergyServices } from '../../hooks/useEnergyServices';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
type Period = 'day' | 'week' | 'month' | 'year';

export default function MonitorScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { hasSolar, hasBattery, hasLighting, hasCooling, label } = useEnergyServices();

  const {
    currentData, stats, isLoading, period,
    loadData, setPeriod, startStream, stopStream,
  } = useEnergyStore();

  const propertyId = currentProperty?.id ?? '';

  // ── Inline AI chat state ──────────────────────────────────────────────────
  type ChatMsg = { id: string; role: 'user' | 'ai'; text: string };
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatHistoryRef = useRef<{ role: 'user' | 'model'; text: string }[]>([]);
  const chatScrollRef = useRef<FlatList>(null);

  const getEnergyContext = () => ({
    solarKw: currentData?.solarKw,
    batteryPercent: currentData?.batteryPercent,
    gridKw: currentData?.gridKw,
    consumption: currentData?.consumption,
    lightingKw: currentData?.lightingKw,
    coolingKw: currentData?.coolingKw,
    currentKwh: stats?.currentKwh,
    monthlyBill: stats?.monthlyBill,
    carbonSavedKg: stats?.carbonSavedKg,
    solarProduction: stats?.solarProduction,
    trendPercent: stats?.trendPercent,
    period,
  });

  const sendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput('');

    const userMsg: ChatMsg = { id: Date.now().toString(), role: 'user', text };
    setChatMessages(prev => [...prev, userMsg]);
    chatHistoryRef.current.push({ role: 'user', text });
    setChatLoading(true);

    try {
      const response = await askGemini(text, getEnergyContext(), chatHistoryRef.current.slice(0, -1));
      chatHistoryRef.current.push({ role: 'model', text: response });
      if (chatHistoryRef.current.length > 20) chatHistoryRef.current = chatHistoryRef.current.slice(-20);
      setChatMessages(prev => [...prev, { id: Math.random().toString(), role: 'ai', text: response }]);
    } catch (err: any) {
      Alert.alert('AI Advisor', err?.message ?? 'Failed to get response.');
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    loadData(propertyId, period);
    startStream(propertyId);
    return () => stopStream();
  }, [propertyId]);

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    loadData(propertyId, p);
  };

  const periods: { key: Period; label: string }[] = [
    { key: 'day', label: 'Day' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
  ];

  const realtimeItems = [
    hasSolar    && { key: 'solar',    icon: '☀️', label: 'Solar',    value: `${currentData?.solarKw ?? 0} kW` },
    hasBattery  && { key: 'battery',  icon: '🔋', label: 'Battery',  value: `${currentData?.batteryPercent ?? 0}%` },
    hasLighting && { key: 'lighting', icon: '💡', label: 'Lighting', value: `${currentData?.lightingKw ?? 0} kW` },
    hasCooling  && { key: 'cooling',  icon: '❄️', label: 'Cooling',  value: `${currentData?.coolingKw ?? 0} kW` },
                   { key: 'grid',     icon: '⚡', label: 'Grid',     value: `${currentData?.gridKw ?? 0} kW` },
                   { key: 'usage',    icon: '🏠', label: 'Usage',    value: `${currentData?.consumption ?? 0} kW` },
  ].filter(Boolean) as { key: string; icon: string; label: string; value: string }[];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{label} Monitor</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Live card */}
        <LinearGradient
          colors={[colors.primaryDark, colors.surface]}
          style={styles.realtimeCard}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={styles.livePill}>● Live</Text>
          {currentData ? (
            <View style={styles.realtimeGrid}>
              {realtimeItems.map((item, i) => (
                <React.Fragment key={item.key}>
                  {i > 0 && <View style={styles.realtimeDivider} />}
                  <View style={styles.realtimeItem}>
                    <Text style={styles.realtimeIcon}>{item.icon}</Text>
                    <Text style={styles.realtimeValue}>{item.value}</Text>
                    <Text style={styles.realtimeItemLabel}>{item.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          ) : (
            <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.md }} />
          )}
        </LinearGradient>

        {/* Period selector */}
        <View style={styles.periodSelector}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[styles.periodBtn, period === p.key && styles.periodBtnActive]}
              onPress={() => handlePeriodChange(p.key)}
            >
              <Text style={[styles.periodText, period === p.key && styles.periodTextActive]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>⚡</Text>
                <Text style={styles.statValue}>{stats?.currentKwh ?? 0}</Text>
                <Text style={styles.statUnit}>kWh used</Text>
              </View>
              {hasSolar && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>☀️</Text>
                  <Text style={styles.statValue}>{stats?.solarProduction ?? 0}</Text>
                  <Text style={styles.statUnit}>kWh solar</Text>
                </View>
              )}
              {hasBattery && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🔋</Text>
                  <Text style={styles.statValue}>{stats?.batteryCycles ?? 0}</Text>
                  <Text style={styles.statUnit}>battery cycles</Text>
                </View>
              )}
              {hasLighting && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>💡</Text>
                  <Text style={styles.statValue}>{stats?.lightingHours ?? 0}</Text>
                  <Text style={styles.statUnit}>hrs lighting</Text>
                </View>
              )}
              {hasCooling && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>❄️</Text>
                  <Text style={styles.statValue}>{stats?.coolingHours ?? 0}</Text>
                  <Text style={styles.statUnit}>hrs cooling</Text>
                </View>
              )}
              {hasSolar && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🌱</Text>
                  <Text style={styles.statValue}>{stats?.carbonSavedKg ?? 0}</Text>
                  <Text style={styles.statUnit}>kg CO₂ saved</Text>
                </View>
              )}
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>💰</Text>
                <Text style={styles.statValue}>₹{stats?.monthlyBill ?? 0}</Text>
                <Text style={styles.statUnit}>bill estimate</Text>
              </View>
            </View>

            {stats?.trendPercent !== undefined && (
              <View style={styles.trendCard}>
                <Text style={styles.trendTitle}>Usage Trend</Text>
                <View style={styles.trendRow}>
                  <Text style={[styles.trendValue, { color: stats.trendPercent < 0 ? colors.primary : colors.error }]}>
                    {stats.trendPercent < 0 ? '↓' : '↑'} {Math.abs(stats.trendPercent)}%
                  </Text>
                  <Text style={styles.trendDesc}>
                    {stats.trendPercent < 0 ? 'Lower than previous period — great work!' : 'Higher than previous period'}
                  </Text>
                </View>
              </View>
            )}

            {stats?.history && stats.history.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.historyTitle}>Consumption History</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.barsContainer}>
                    {stats.history.slice(-14).map((item, index) => {
                      const maxVal = Math.max(...stats.history!.map(h => h.consumption ?? 0), 1);
                      const height = Math.max(((item.consumption ?? 0) / maxVal) * 80, 4);
                      return (
                        <View key={index} style={styles.barWrapper}>
                          <View style={styles.barTrack}>
                            <View style={[styles.bar, { height }]} />
                          </View>
                          <Text style={styles.barLabel}>{new Date(item.date).getDate()}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            )}

            {hasSolar && stats?.solarHistory && stats.solarHistory.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.historyTitle}>Solar Production History</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.barsContainer}>
                    {stats.solarHistory.slice(-14).map((item, index) => {
                      const maxVal = Math.max(...stats.solarHistory!.map(h => h.production ?? 0), 1);
                      const height = Math.max(((item.production ?? 0) / maxVal) * 80, 4);
                      return (
                        <View key={index} style={styles.barWrapper}>
                          <View style={styles.barTrack}>
                            <View style={[styles.bar, { height, backgroundColor: colors.solar }]} />
                          </View>
                          <Text style={styles.barLabel}>{new Date(item.date).getDate()}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
        <View style={{ height: spacing.xxl }} />

        {/* ── Inline AI Chat ─────────────────────────────────────────────── */}
        <View style={styles.chatSection}>
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderLeft}>
              <View style={styles.aiIconBadge}><Text style={styles.aiIconText}>AI</Text></View>
              <View>
                <Text style={styles.chatTitle}>Energy Advisor</Text>
                <Text style={styles.chatSubtitle}>Powered by Gemini · Live data</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/(customer)/ai-advisor')} style={styles.expandBtn}>
              <Text style={styles.expandBtnText}>Full chat →</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          {chatMessages.length === 0 ? (
            <View style={styles.chatEmpty}>
              <Text style={styles.chatEmptyText}>Ask me anything about your energy data above ↑</Text>
            </View>
          ) : (
            <FlatList
              ref={chatScrollRef}
              data={chatMessages}
              keyExtractor={m => m.id}
              style={styles.chatList}
              onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
              renderItem={({ item }) => (
                <View style={[styles.chatBubble, item.role === 'user' ? styles.chatBubbleUser : styles.chatBubbleAI]}>
                  <Text style={[styles.chatBubbleText, item.role === 'user' ? styles.chatBubbleTextUser : styles.chatBubbleTextAI]}>
                    {item.text}
                  </Text>
                </View>
              )}
            />
          )}

          {chatLoading && (
            <View style={styles.typingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.typingText}>Thinking...</Text>
            </View>
          )}

          {/* Quick prompts */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRow} contentContainerStyle={{ gap: spacing.sm }}>
            {['How can I save on my bill?', 'Is my solar performing well?', 'Battery optimisation tips'].map(q => (
              <TouchableOpacity key={q} style={styles.quickChip} onPress={() => { setChatInput(q); }}>
                <Text style={styles.quickChipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Input */}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                value={chatInput}
                onChangeText={setChatInput}
                placeholder="Ask about your energy..."
                placeholderTextColor={colors.textTertiary}
                returnKeyType="send"
                onSubmitEditing={sendChatMessage}
                multiline={false}
              />
              <TouchableOpacity
                style={[styles.chatSendBtn, (!chatInput.trim() || chatLoading) && styles.chatSendBtnDisabled]}
                onPress={sendChatMessage}
                disabled={!chatInput.trim() || chatLoading}
              >
                <Text style={styles.chatSendBtnText}>→</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  backBtn: { padding: spacing.xs },
  backArrow: { fontSize: 24, color: colors.primary },
  title: { fontSize: typography.h3, fontWeight: '700', color: colors.textPrimary },
  realtimeCard: { margin: spacing.md, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  livePill: { fontSize: typography.tiny, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  realtimeGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 },
  realtimeItem: { flex: 1, alignItems: 'center', minWidth: 52 },
  realtimeDivider: { width: 1, backgroundColor: colors.border, alignSelf: 'stretch' },
  realtimeIcon: { fontSize: 20, marginBottom: spacing.xs },
  realtimeValue: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },
  realtimeItemLabel: { fontSize: typography.tiny, color: colors.textTertiary, marginTop: 2 },
  periodSelector: { flexDirection: 'row', marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: 4 },
  periodBtn: { flex: 1, paddingVertical: spacing.xs, alignItems: 'center', borderRadius: borderRadius.sm },
  periodBtnActive: { backgroundColor: colors.primary },
  periodText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  periodTextActive: { color: colors.primaryDark },
  loadingContainer: { padding: spacing.xxl, alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.md, marginBottom: spacing.md },
  statCard: { width: (SCREEN_WIDTH - spacing.md * 2 - spacing.sm) / 2 - 1, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  statIcon: { fontSize: 28, marginBottom: spacing.xs },
  statValue: { fontSize: typography.h3, fontWeight: '700', color: colors.textPrimary },
  statUnit: { fontSize: typography.tiny, color: colors.textTertiary, marginTop: 2 },
  trendCard: { marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  trendTitle: { fontSize: typography.small, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.sm },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  trendValue: { fontSize: typography.h3, fontWeight: '700' },
  trendDesc: { flex: 1, fontSize: typography.small, color: colors.textSecondary },
  historySection: { marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  historyTitle: { fontSize: typography.small, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.md },
  barsContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, paddingBottom: spacing.xs },
  barWrapper: { alignItems: 'center', width: 24 },
  barTrack: { height: 80, justifyContent: 'flex-end' },
  bar: { width: 16, backgroundColor: colors.primary, borderRadius: 3 },
  barLabel: { fontSize: 9, color: colors.textTertiary, marginTop: 4 },

  // ── Inline AI chat ────────────────────────────────────────────────────────
  chatSection: { marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  chatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.primaryLight },
  chatHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  aiIconBadge: { width: 36, height: 36, borderRadius: borderRadius.sm, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  aiIconText: { fontSize: 12, fontWeight: '700', color: colors.primaryDark },
  chatTitle: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },
  chatSubtitle: { fontSize: typography.tiny, color: colors.textSecondary },
  expandBtn: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, backgroundColor: colors.primary, borderRadius: borderRadius.sm },
  expandBtnText: { fontSize: typography.tiny, fontWeight: '700', color: colors.primaryDark },
  chatEmpty: { padding: spacing.lg, alignItems: 'center' },
  chatEmptyText: { fontSize: typography.small, color: colors.textTertiary, textAlign: 'center' },
  chatList: { maxHeight: 220, paddingHorizontal: spacing.sm, paddingTop: spacing.sm },
  chatBubble: { maxWidth: '85%', borderRadius: borderRadius.md, padding: spacing.sm, marginBottom: spacing.xs },
  chatBubbleUser: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  chatBubbleAI: { alignSelf: 'flex-start', backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  chatBubbleText: { fontSize: typography.small, lineHeight: 18 },
  chatBubbleTextUser: { color: colors.primaryDark },
  chatBubbleTextAI: { color: colors.textPrimary },
  typingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  typingText: { fontSize: typography.tiny, color: colors.textSecondary },
  quickRow: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  quickChip: { backgroundColor: colors.primaryLight, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.primary },
  quickChipText: { fontSize: typography.tiny, color: colors.primary, fontWeight: '600' },
  chatInputRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.sm },
  chatInput: { flex: 1, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, fontSize: typography.small, color: colors.textPrimary, maxHeight: 80 },
  chatSendBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  chatSendBtnDisabled: { opacity: 0.4 },
  chatSendBtnText: { fontSize: 18, color: colors.primaryDark, fontWeight: '700' },
});