// app/(customer)/ai-advisor.tsx
import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, IMessage, Send, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAIResponseAsync } from '../../mock/aiAdvisor';
import { colors, spacing } from '../../theme/colors';
import { Text, TouchableOpacity } from 'react-native';

export default function AIAdvisor() {
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial greeting message
    setMessages([
      {
        _id: 1,
        text: "Hi! I'm your AI Energy Advisor 🤖\n\nI can help you:\n• Reduce your electricity bill\n• Optimize solar usage\n• Understand consumption patterns\n• Get personalized tips\n\nWhat would you like to know?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Advisor',
          avatar: '🤖',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const userMessage = newMessages[0];
    
    // Add user message
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );

    // Show typing indicator
    setIsTyping(true);

    // Get AI response
    const responseText = await getAIResponseAsync(userMessage.text);

    // Hide typing indicator
    setIsTyping(false);

    // Add AI response
    const aiMessage: IMessage = {
      _id: Math.random().toString(),
      text: responseText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'AI Advisor',
        avatar: '🤖',
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [aiMessage])
    );
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
          },
          left: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: colors.textPrimary,
          },
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send 
        {...props}
        containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: spacing.sm,
            marginBottom: spacing.sm,
      }}
      >
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };
  const renderComposer = (props: any) => {
    return (
        <Composer
        {...props}
        placeholder="Ask about your energy usage..."
        textInputStyle={{
            color: colors.textPrimary,
        }}
        />
    );
};


  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>AI Energy Advisor</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      {/* Chat */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          isTyping={isTyping}
          messagesContainerStyle={styles.messagesContainer}
        />
      </KeyboardAvoidingView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick questions:</Text>
        <View style={styles.quickButtonsRow}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => onSend([{
              _id: Math.random().toString(),
              text: 'How can I reduce my bill?',
              createdAt: new Date(),
              user: { _id: 1 },
            }])}
          >
            <Text style={styles.quickButtonText}>💰 Reduce bill</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => onSend([{
              _id: Math.random().toString(),
              text: 'Show my carbon impact',
              createdAt: new Date(),
              user: { _id: 1 },
            }])}
          >
            <Text style={styles.quickButtonText}>🌱 Carbon impact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    backgroundColor: colors.background,
  },
  inputToolbar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.xs,
  },
  inputPrimary: {
    alignItems: 'center',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  sendButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  quickActions: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quickActionsTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickButton: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
});
