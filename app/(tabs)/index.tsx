import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { MapPin, Clock, Heart, Star } from 'lucide-react-native';

const mockItems = [
  {
    id: '1',
    title: 'Baby Stroller - Like New',
    description: 'Excellent condition baby stroller, used for 6 months only',
    category: 'strollers',
    condition: 'like-new',
    image: 'https://images.pexels.com/photos/6849067/pexels-photo-6849067.jpeg',
    location: 'Brooklyn, NY',
    distance: '0.5 miles',
    donor: {
      name: 'Sarah M.',
      rating: 4.8,
      verified: true,
    },
    postedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Baby Clothes Bundle 0-6M',
    description: '15 pieces of baby clothes in excellent condition',
    category: 'clothing',
    condition: 'good',
    image: 'https://images.pexels.com/photos/1560065/pexels-photo-1560065.jpeg',
    location: 'Manhattan, NY',
    distance: '1.2 miles',
    donor: {
      name: 'Maria L.',
      rating: 5.0,
      verified: true,
    },
    postedAt: '4 hours ago',
  },
  {
    id: '3',
    title: 'High Chair - Wooden',
    description: 'Solid wood high chair, perfect for toddlers',
    category: 'furniture',
    condition: 'good',
    image: 'https://images.pexels.com/photos/1648772/pexels-photo-1648772.jpeg',
    location: 'Queens, NY',
    distance: '2.1 miles',
    donor: {
      name: 'Jennifer K.',
      rating: 4.9,
      verified: true,
    },
    postedAt: '1 day ago',
  },
];

// Memoized item component for better performance
const ItemCard = React.memo(({ item, onPress, onFavorite }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item.id)}>
    <Card style={styles.itemCard}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.itemImage}
        resizeMode="cover"
        // Add loading optimization
        loadingIndicatorSource={{ uri: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' }}
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => onFavorite(item.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart size={20} color={Colors.text.secondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.itemMeta}>
          <View style={styles.locationInfo}>
            <MapPin size={14} color={Colors.text.secondary} />
            <Text style={styles.locationDistance}>{item.distance}</Text>
          </View>
          <View style={styles.timeInfo}>
            <Clock size={14} color={Colors.text.secondary} />
            <Text style={styles.timeText}>{item.postedAt}</Text>
          </View>
        </View>
        
        <View style={styles.donorInfo}>
          <View style={styles.donorDetails}>
            <Text style={styles.donorName}>{item.donor.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={12} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.ratingText}>{item.donor.rating}</Text>
            </View>
          </View>
          <View style={[styles.conditionBadge, styles[`condition${item.condition}`]]}>
            <Text style={[styles.conditionText, styles[`condition${item.condition}Text`]]}>
              {item.condition.replace('-', ' ')}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
));

export default function HomeScreen() {
  // Memoize handlers to prevent unnecessary re-renders
  const handleItemPress = useCallback((itemId) => {
    console.log('Item pressed:', itemId);
  }, []);

  const handleFavorite = useCallback((itemId) => {
    console.log('Favorite toggled:', itemId);
  }, []);

  const handleLocationPress = useCallback(() => {
    console.log('Location pressed');
  }, []);

  // Memoize the render item function
  const renderItem = useCallback(({ item }) => (
    <ItemCard 
      item={item} 
      onPress={handleItemPress}
      onFavorite={handleFavorite}
    />
  ), [handleItemPress, handleFavorite]);

  // Memoize the key extractor
  const keyExtractor = useCallback((item) => item.id, []);

  // Memoize static content
  const headerContent = useMemo(() => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.subtitle}>Find items for your little ones</Text>
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
        <MapPin size={16} color={Colors.primary} />
        <Text style={styles.locationText}>Brooklyn, NY</Text>
      </TouchableOpacity>
    </View>
  ), [handleLocationPress]);

  const statsContent = useMemo(() => (
    <View style={styles.quickStats}>
      <Card style={styles.statCard}>
        <Text style={styles.statNumber}>127</Text>
        <Text style={styles.statLabel}>Items Available</Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statNumber}>45</Text>
        <Text style={styles.statLabel}>Nearby Donors</Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statNumber}>12</Text>
        <Text style={styles.statLabel}>Items Saved</Text>
      </Card>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {headerContent}
            {statsContent}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Posted</Text>
            </View>
          </>
        }
        contentContainerStyle={styles.listContainer}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        initialNumToRender={3}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 320, // Approximate item height
          offset: 320 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  itemCard: {
    padding: 0,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  itemImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.surface,
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationDistance: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  donorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  donorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  donorName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  conditionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  conditionnew: {
    backgroundColor: `${Colors.success}15`,
  },
  conditionnewText: {
    color: Colors.success,
  },
  'conditionlike-new': {
    backgroundColor: `${Colors.primary}15`,
  },
  'conditionlike-newText': {
    color: Colors.primary,
  },
  conditiongood: {
    backgroundColor: `${Colors.warning}15`,
  },
  conditiongoodText: {
    color: Colors.warning,
  },
  conditionfair: {
    backgroundColor: `${Colors.text.secondary}15`,
  },
  conditionfairText: {
    color: Colors.text.secondary,
  },
});