// app/(customer)/ai-advisor.tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, IMessage, Send, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme/colors';
import { useEnergyStore } from '../../store/useEnergyStore';
import { useCurrentProperty } from '../../store/useAuthStore';
import { askGemini } from '../../services/gemini';

const AI_USER = { _id: 2, name: 'AI Advisor', avatar: '🤖' as any };

const GREETING =
  "Hi! I'm your AI Energy Advisor 🤖\n\nI have access to your live energy data and can help you:\n• Reduce your electricity bill\n• Optimise solar & battery usage\n• Understand consumption patterns\n• Get personalised tips based on your actual readings\n\nWhat would you like to know?";

const QUICK_QUESTIONS = [
  { label: '💰 Reduce my bill', text: 'How can I reduce my electricity bill based on my current usage?' },
  { label: '☀️ Solar tips', text: 'How well is my solar system performing and how can I improve it?' },
  { label: '🔋 Battery advice', text: 'Give me advice on optimising my battery usage.' },
  { label: '🌱 Carbon impact', text: 'What is my carbon impact and how can I improve it?' },
];

export default function AIAdvisor() {
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const historyRef = useRef<{ role: 'user' | 'model'; text: string }[]>([]);

  const { currentData, stats, period } = useEnergyStore();
  const currentProperty = useCurrentProperty();

  // Build energy context from live store data
  const getEnergyContext = () => ({
    solarKw:        currentData?.solarKw,
    batteryPercent: currentData?.batteryPercent,
    gridKw:         currentData?.gridKw,
    consumption:    currentData?.consumption,
    lightingKw:     currentData?.lightingKw,
    coolingKw:      currentData?.coolingKw,
    currentKwh:     stats?.currentKwh,
    monthlyBill:    stats?.monthlyBill,
    carbonSavedKg:  stats?.carbonSavedKg,
    solarProduction: stats?.solarProduction,
    trendPercent:   stats?.trendPercent,
    period,
  });

  useEffect(() => {
    setMessages([{
      _id: 1,
      text: GREETING,
      createdAt: new Date(),
      user: AI_USER,
    }]);
  }, []);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const userMessage = newMessages[0];
    setMessages(prev => GiftedChat.append(prev, newMessages));
    setIsTyping(true);

    historyRef.current.push({ role: 'user', text: userMessage.text });

    try {
      const responseText = await askGemini(
        userMessage.text,
        getEnergyContext(),
        historyRef.current.slice(0, -1),
      );

      historyRef.current.push({ role: 'model', text: responseText });

      if (historyRef.current.length > 20) {
        historyRef.current = historyRef.current.slice(-20);
      }

      const aiMessage: IMessage = {
        _id: Math.random().toString(),
        text: responseText,
        createdAt: new Date(),
        user: AI_USER,
      };
      setMessages(prev => GiftedChat.append(prev, [aiMessage]));
    } catch (err: any) {
      Alert.alert('AI Advisor', err?.message ?? 'Failed to get response. Check your Gemini API key.');
    } finally {
      setIsTyping(false);
    }
  }, [currentData, stats, period]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>AI Energy Advisor</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Gemini · Live data</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <GiftedChat
          messages={messages}
          onSend={msgs => onSend(msgs)}
          user={{ _id: 1 }}
          isTyping={isTyping}
          messagesContainerStyle={styles.messagesContainer}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: { backgroundColor: colors.primary },
                left: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
              }}
              textStyle={{
                right: { color: '#fff' },
                left: { color: colors.textPrimary },
              }}
            />
          )}
          renderSend={(props) => (
            <Send {...props} containerStyle={styles.sendContainer}>
              <View style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </View>
            </Send>
          )}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={styles.inputToolbar}
              primaryStyle={styles.inputPrimary}
            />
          )}
          renderComposer={(props) => (
            <Composer
              {...props}
            />
          )}
        />
      </KeyboardAvoidingView>

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick questions:</Text>
        <View style={styles.quickButtonsRow}>
          {QUICK_QUESTIONS.map((q) => (
            <TouchableOpacity
              key={q.label}
              style={styles.quickButton}
              onPress={() => onSend([{ _id: Math.random().toString(), text: q.text, createdAt: new Date(), user: { _id: 1 } }])}
            >
              <Text style={styles.quickButtonText}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  backButton: { marginBottom: spacing.sm },
  backButtonText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.xs },
  statusBadge: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success ?? '#4CAF50', marginRight: spacing.xs },
  statusText: { fontSize: 12, color: colors.textSecondary },
  chatContainer: { flex: 1 },
  messagesContainer: { backgroundColor: colors.background },
  inputToolbar: { backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.xs },
  inputPrimary: { alignItems: 'center' },
  sendContainer: { justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm, marginBottom: spacing.sm },
  sendButton: { justifyContent: 'center', alignItems: 'center' },
  sendButtonText: { color: colors.primary, fontWeight: '600', fontSize: 16 },
  quickActions: { padding: spacing.md, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  quickActionsTitle: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
  quickButtonsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  quickButton: { backgroundColor: colors.primaryLight, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: 8 },
  quickButtonText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
});
