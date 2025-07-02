import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { MessageCircle, Clock, CheckCheck } from 'lucide-react-native';

const mockConversations = [
  {
    id: '1',
    participant: {
      name: 'Sarah Martinez',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      verified: true,
    },
    lastMessage: {
      content: 'Hi! Is the stroller still available?',
      timestamp: '2 min ago',
      read: false,
      fromMe: false,
    },
    item: {
      title: 'Baby Stroller - Like New',
      image: 'https://images.pexels.com/photos/6849067/pexels-photo-6849067.jpeg',
    },
  },
  {
    id: '2',
    participant: {
      name: 'Jennifer Kim',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      verified: true,
    },
    lastMessage: {
      content: 'Thanks for the quick pickup! The high chair is perfect.',
      timestamp: '1 hour ago',
      read: true,
      fromMe: false,
    },
    item: {
      title: 'High Chair - Wooden',
      image: 'https://images.pexels.com/photos/1648772/pexels-photo-1648772.jpeg',
    },
  },
  {
    id: '3',
    participant: {
      name: 'Maria Lopez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      verified: false,
    },
    lastMessage: {
      content: 'Can you meet tomorrow at 3 PM?',
      timestamp: '3 hours ago',
      read: true,
      fromMe: true,
    },
    item: {
      title: 'Baby Clothes Bundle 0-6M',
      image: 'https://images.pexels.com/photos/1560065/pexels-photo-1560065.jpeg',
    },
  },
  {
    id: '4',
    participant: {
      name: 'Brooklyn Baby Center',
      avatar: 'https://images.pexels.com/photos/273011/pexels-photo-273011.jpeg',
      verified: true,
    },
    lastMessage: {
      content: 'We would love to collect the baby items for families in need.',
      timestamp: '1 day ago',
      read: true,
      fromMe: false,
    },
    item: null,
  },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>2</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockConversations.length === 0 ? (
          <Card style={styles.emptyState}>
            <MessageCircle size={48} color={Colors.text.disabled} />
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptyText}>
              Start conversations when you find items you're interested in or when someone messages you about your posts.
            </Text>
          </Card>
        ) : (
          <View style={styles.conversationsList}>
            {mockConversations.map((conversation) => (
              <TouchableOpacity key={conversation.id} activeOpacity={0.8}>
                <Card style={[styles.conversationCard, !conversation.lastMessage.read && styles.unreadCard]}>
                  <View style={styles.conversationHeader}>
                    <View style={styles.participantInfo}>
                      <Image
                        source={{ uri: conversation.participant.avatar }}
                        style={styles.avatar}
                      />
                      <View style={styles.participantDetails}>
                        <View style={styles.nameRow}>
                          <Text style={styles.participantName}>
                            {conversation.participant.name}
                          </Text>
                          {conversation.participant.verified && (
                            <View style={styles.verifiedBadge}>
                              <CheckCheck size={12} color={Colors.white} />
                            </View>
                          )}
                        </View>
                        <View style={styles.messageInfo}>
                          <Text style={[
                            styles.lastMessageText,
                            !conversation.lastMessage.read && styles.unreadText,
                            conversation.lastMessage.fromMe && styles.sentMessage
                          ]}>
                            {conversation.lastMessage.fromMe && 'You: '}
                            {conversation.lastMessage.content}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.conversationMeta}>
                      <View style={styles.timeContainer}>
                        <Clock size={12} color={Colors.text.secondary} />
                        <Text style={styles.timestamp}>
                          {conversation.lastMessage.timestamp}
                        </Text>
                      </View>
                      {!conversation.lastMessage.read && !conversation.lastMessage.fromMe && (
                        <View style={styles.unreadDot} />
                      )}
                    </View>
                  </View>

                  {conversation.item && (
                    <View style={styles.itemPreview}>
                      <Image
                        source={{ uri: conversation.item.image }}
                        style={styles.itemImage}
                      />
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {conversation.item.title}
                      </Text>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>💬 Messaging Tips</Text>
          <Text style={styles.tipText}>
            • Be polite and respectful in all conversations{'\n'}
            • Arrange pickup times and locations clearly{'\n'}
            • Use the item reference to keep conversations organized{'\n'}
            • Report any inappropriate behavior
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginRight: 12,
  },
  unreadBadge: {
    backgroundColor: Colors.error,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    margin: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  conversationsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  conversationCard: {
    padding: 16,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  participantDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  participantName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 2,
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    flex: 1,
  },
  unreadText: {
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  sentMessage: {
    fontStyle: 'italic',
  },
  conversationMeta: {
    alignItems: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  itemPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: Colors.surface,
    borderRadius: 8,
  },
  itemImage: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
    flex: 1,
  },
  tipCard: {
    margin: 20,
    padding: 20,
    backgroundColor: `${Colors.accent}08`,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});