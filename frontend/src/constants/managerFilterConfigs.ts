import { OrderStatus } from '@types';

export const stockStatusOptions = [
  { value: '', label: 'All Books' },
  { value: 'IN_STOCK', label: 'In Stock' },
  { value: 'LOW_STOCK', label: 'Low Stock' },
  { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
];

export const bookSortOptions = [
  { value: 'createdAt,desc', label: 'Date Added: Newest First' },
  { value: 'createdAt,asc', label: 'Date Added: Oldest First' },
  { value: 'title,asc', label: 'Title: A-Z' },
  { value: 'title,desc', label: 'Title: Z-A' },
  { value: 'price,desc', label: 'Price: High to Low' },
  { value: 'price,asc', label: 'Price: Low to High' },
  { value: 'stockQuantity,asc', label: 'Stock: Low to High' },
  { value: 'stockQuantity,desc', label: 'Stock: High to Low' },
];

export const orderStatusOptions = [
  { value: '', label: 'All Statuses' },
  { value: OrderStatus.PENDING, label: 'Pending' },
  { value: OrderStatus.PAID, label: 'Paid' },
  { value: OrderStatus.SHIPPED, label: 'Shipped' },
  { value: OrderStatus.DELIVERED, label: 'Delivered' },
  { value: OrderStatus.CANCELLED, label: 'Cancelled' },
];

export const orderSortOptions = [
  { value: 'orderDate,desc', label: 'Date: Newest First' },
  { value: 'orderDate,asc', label: 'Date: Oldest First' },
  { value: 'totalAmount,desc', label: 'Total: High to Low' },
  { value: 'totalAmount,asc', label: 'Total: Low to High' },
  { value: 'status,asc', label: 'Status: A-Z' },
];

export const genreSortOptions = [
  { value: 'name,asc', label: 'Name: A-Z' },
  { value: 'name,desc', label: 'Name: Z-A' },
];

export const discountStatusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'EXPIRED', label: 'Expired' },
];

export const discountSortOptions = [
  { value: 'createdAt,desc', label: 'Date Created (Newest First)' },
  { value: 'createdAt,asc', label: 'Date Created (Oldest First)' },
  { value: 'name,asc', label: 'Name (A-Z)' },
  { value: 'name,desc', label: 'Name (Z-A)' },
  { value: 'percentage,desc', label: 'Percentage (High to Low)' },
  { value: 'percentage,asc', label: 'Percentage (Low to High)' },
  { value: 'validFrom,desc', label: 'Valid From (Newest First)' },
  { value: 'validFrom,asc', label: 'Valid From (Oldest First)' },
];

export const userRoleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'USER', label: 'User' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ADMIN', label: 'Admin' },
];

export const userLoyaltyOptions = [
  { value: '', label: 'All Users' },
  { value: 'true', label: 'Loyalty Members' },
  { value: 'false', label: 'Non-Members' },
];

export const userSortOptions = [
  { value: 'registrationDate,desc', label: 'Registration: Newest First' },
  { value: 'registrationDate,asc', label: 'Registration: Oldest First' },
  { value: 'lastName,asc', label: 'Name: A-Z' },
  { value: 'lastName,desc', label: 'Name: Z-A' },
  { value: 'email,asc', label: 'Email: A-Z' },
  { value: 'totalSpent,desc', label: 'Total Spent: High to Low' },
  { value: 'totalSpent,asc', label: 'Total Spent: Low to High' },
];
