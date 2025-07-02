import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Settings, 
  Star, 
  MapPin, 
  Calendar, 
  Heart, 
  Package, 
  MessageCircle, 
  Shield,
  HelpCircle,
  LogOut
} from 'lucide-react-native';

const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  role: 'donor',
  rating: 4.8,
  reviewCount: 23,
  verified: true,
  location: 'Brooklyn, NY',
  joinedDate: 'March 2024',
  stats: {
    itemsDonated: 15,
    itemsReceived: 3,
    totalMessages: 47,
    favoriteItems: 8,
  }
};

export default function ProfileScreen() {
  const menuItems = [
    { icon: Package, title: 'My Items', subtitle: 'Manage your posted items' },
    { icon: Heart, title: 'Saved Items', subtitle: 'Items you\'ve favorited' },
    { icon: MessageCircle, title: 'Message History', subtitle: 'View all conversations' },
    { icon: Star, title: 'Reviews', subtitle: 'See what others say about you' },
    { icon: Settings, title: 'Settings', subtitle: 'Account and preferences' },
    { icon: Shield, title: 'Privacy & Safety', subtitle: 'Manage your privacy settings' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and contact us' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{mockUser.name}</Text>
                {mockUser.verified && (
                  <View style={styles.verifiedBadge}>
                    <Shield size={12} color={Colors.white} />
                  </View>
                )}
              </View>
              <Text style={styles.email}>{mockUser.email}</Text>
              <View style={styles.locationRow}>
                <MapPin size={14} color={Colors.text.secondary} />
                <Text style={styles.location}>{mockUser.location}</Text>
              </View>
              <View style={styles.joinedRow}>
                <Calendar size={14} color={Colors.text.secondary} />
                <Text style={styles.joinedDate}>Joined {mockUser.joinedDate}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Settings size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingSection}>
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.rating}>{mockUser.rating}</Text>
              <Text style={styles.reviewCount}>({mockUser.reviewCount} reviews)</Text>
            </View>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {mockUser.role === 'donor' ? '🎁 Donor' : 
                 mockUser.role === 'recipient' ? '💝 Recipient' : 
                 mockUser.role === 'charity' ? '🏢 Charity' : '👤 User'}
              </Text>
            </View>
          </View>
        </Card>

        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Package size={24} color={Colors.primary} />
              <Text style={styles.statNumber}>{mockUser.stats.itemsDonated}</Text>
              <Text style={styles.statLabel}>Items Donated</Text>
            </View>
            <View style={styles.statItem}>
              <Heart size={24} color={Colors.secondary} />
              <Text style={styles.statNumber}>{mockUser.stats.itemsReceived}</Text>
              <Text style={styles.statLabel}>Items Received</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle size={24} color={Colors.accent} />
              <Text style={styles.statNumber}>{mockUser.stats.totalMessages}</Text>
              <Text style={styles.statLabel}>Messages Sent</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={24} color={Colors.warning} />
              <Text style={styles.statNumber}>{mockUser.stats.favoriteItems}</Text>
              <Text style={styles.statLabel}>Items Saved</Text>
            </View>
          </View>
        </Card>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity key={index} activeOpacity={0.8}>
                <Card style={styles.menuItem}>
                  <View style={styles.menuIcon}>
                    <IconComponent size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.menuArrow}>
                    <Text style={styles.arrow}>›</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Button
            title="Switch to Recipient Mode"
            variant="outline"
            onPress={() => {}}
            style={styles.switchButton}
          />
          
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={Colors.error} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>🏆 Recent Achievement</Text>
          <Text style={styles.achievementText}>
            "Community Helper" - You've helped 10+ families in your neighborhood!
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: 20,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: Colors.success,
    borderRadius: 10,
    padding: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  joinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  joinedDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  editButton: {
    padding: 8,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  roleBadge: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  statsCard: {
    margin: 20,
    marginTop: 0,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: `${Colors.primary}15`,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  menuArrow: {
    padding: 4,
  },
  arrow: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
  actions: {
    padding: 20,
    gap: 16,
  },
  switchButton: {
    width: '100%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.error,
  },
  achievementCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: `${Colors.warning}10`,
    borderWidth: 1,
    borderColor: `${Colors.warning}30`,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});