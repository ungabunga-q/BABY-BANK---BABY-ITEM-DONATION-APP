import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Search, Filter, SlidersHorizontal, MapPin } from 'lucide-react-native';
import { ITEM_CATEGORIES } from '@/constants/categories';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Items</Text>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for baby items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text.disabled}
          />
        </View>
        
        <TouchableOpacity style={styles.locationFilter}>
          <MapPin size={16} color={Colors.primary} />
          <Text style={styles.locationText}>Near me</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <View style={styles.categories}>
              {ITEM_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(
                    selectedCategory === category.id ? '' : category.id
                  )}
                >
                  <Text style={styles.categoryIcon}>
                    {category.id === 'clothing' && '👕'}
                    {category.id === 'toys' && '🧸'}
                    {category.id === 'feeding' && '🍼'}
                    {category.id === 'furniture' && '🪑'}
                    {category.id === 'strollers' && '🚼'}
                    {category.id === 'books' && '📚'}
                    {category.id === 'safety' && '🛡️'}
                    {category.id === 'bathing' && '🛁'}
                    {category.id === 'other' && '📦'}
                  </Text>
                  <Text style={[
                    styles.categoryName,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.popularSearches}>
            {['Baby clothes 0-6M', 'Stroller', 'High chair', 'Baby books', 'Toys 2-3 years'].map((search, index) => (
              <TouchableOpacity key={index} style={styles.popularSearchTag}>
                <Text style={styles.popularSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Filters</Text>
          <View style={styles.quickFilters}>
            <TouchableOpacity style={styles.quickFilter}>
              <Text style={styles.quickFilterText}>🏆 Highly Rated</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickFilter}>
              <Text style={styles.quickFilterText}>📍 Within 5 miles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickFilter}>
              <Text style={styles.quickFilterText}>⭐ New Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickFilter}>
              <Text style={styles.quickFilterText}>🚨 Urgent Need</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Search Tips</Text>
          <Text style={styles.tipText}>
            • Be specific with size and age range{'\n'}
            • Use condition filters to find exactly what you need{'\n'}
            • Set location radius to find items nearby{'\n'}
            • Save searches to get notified of new matches
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  filterButton: {
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  locationFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  categoriesScroll: {
    marginHorizontal: -20,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: Colors.white,
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularSearchTag: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  popularSearchText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  quickFilters: {
    gap: 12,
  },
  quickFilter: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickFilterText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  tipCard: {
    margin: 20,
    padding: 20,
    backgroundColor: `${Colors.primary}08`,
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