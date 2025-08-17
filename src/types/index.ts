export type UserRole = 'admin' | 'client' | 'lawyer'

export type Page = 
  | 'dashboard' | 'crm' | 'users' | 'conversations' | 'calendar' | 'sales'
  | 'automations' | 'chatbots' | 'publisher' | 'content-studio' | 'campaigns'
  | 'sites' | 'forms' | 'media' | 'database' | 'products' | 'documents'
  | 'analytics' | 'financials' | 'projects' | 'credits' | 'affiliates' | 'settings'
  | 'form-editor' | 'form-submissions' | 'site-editor' | 'course-editor' | 'website-editor' | 'vrar'

export type PublicRoute = 
  | 'home' | 'plans' | 'login' | 'register' | 'contact' | 'services' | 'service-detail'
  | 'blog' | 'blog-post' | 'checkout' | 'catalogo' | 'ebooks' | 'courses' | 'course-detail'
  | 'forum' | 'games' | 'calendar' | 'consultas' | 'privacy-policy' | 'terms-of-service'

export interface Branch {
  id: string
  name: string
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  branch?: string
  phone?: string
  address?: string
}

export interface CatalogItem {
  id: string
  type: 'product' | 'service' | 'course' | 'ebook' | 'masterclass' | 'consulta'
  name: string
  description: string
  price: number
  status: 'active' | 'inactive' | 'draft'
  category: string
  imageUrl?: string
  slug?: string
  shortDescription?: string
  longDescription?: string
  keyPoints?: string[]
  stock?: number
  duration?: string
  durationText?: string
  color?: string
  isFeatured?: boolean
  modules?: CourseModule[]
  attention?: {
    modalities: string[]
    canSchedule: boolean
  }
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  status: 'active' | 'inactive'
  category: string
  imageUrl?: string
  stock: number
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  status: 'active' | 'inactive'
  category: string
  imageUrl?: string
  duration: string
  color: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string
  modules: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'pdf' | 'quiz'
  content: string
  duration?: number
}

export interface LegalService {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string
  keyPoints: string[]
  price: number
  category: string
}

export interface Appointment {
  id: string
  contactName: string
  serviceId: string
  dateTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  modality: 'virtual' | 'presencial' | 'chat' | 'correo'
  notes?: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  status: 'active' | 'inactive'
  createdAt: string
  cases: Case[]
}

export interface Case {
  id: string
  title: string
  description: string
  clientId: string
  status: 'open' | 'closed' | 'pending'
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: string
  updatedAt: string
  documents: Document[]
  appointments: Appointment[]
}

export interface Document {
  id: string
  title: string
  type: string
  url: string
  caseId?: string
  clientId?: string
  uploadedAt: string
  size: number
  tags: string[]
}

export interface Conversation {
  id: string
  clientId: string
  messages: Message[]
  status: 'active' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: 'text' | 'file' | 'image'
  attachments?: string[]
}

export interface Order {
  id: string
  clientId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'cancelled'
  paymentMethod: string
  createdAt: string
}

export interface OrderItem {
  id: string
  itemId: string
  itemType: string
  itemName: string
  quantity: number
  price: number
}

export interface UserPurchase {
  id: string
  itemId: string
  itemType: string
  itemName: string
  amount: number
  purchaseDate: string
  paymentMethod: string
}

export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  progress: number
  lastAccessed: string
}

export interface Form {
  id: string
  title: string
  description: string
  fields: FormField[]
  submissions: FormSubmission[]
  createdAt: string
  isActive: boolean
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date'
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface FormSubmission {
  id: string
  formId: string
  data: Record<string, any>
  submittedAt: string
  clientId?: string
}

export interface Site {
  id: string
  name: string
  domain: string
  template: string
  content: any
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  type: 'email' | 'sms' | 'social'
  status: 'draft' | 'active' | 'paused' | 'completed'
  targetAudience: string[]
  content: any
  scheduledAt?: string
  createdAt: string
}

export interface Automation {
  id: string
  name: string
  description: string
  trigger: string
  actions: AutomationAction[]
  isActive: boolean
  createdAt: string
}

export interface AutomationAction {
  id: string
  type: 'email' | 'sms' | 'notification' | 'task'
  config: Record<string, any>
}

export interface Chatbot {
  id: string
  name: string
  description: string
  responses: ChatbotResponse[]
  isActive: boolean
  createdAt: string
}

export interface ChatbotResponse {
  id: string
  trigger: string
  response: string
  actions?: string[]
}

export interface Analytics {
  totalClients: number
  totalCases: number
  totalRevenue: number
  monthlyGrowth: number
  topServices: Array<{ name: string; count: number }>
  recentActivity: Array<{ type: string; description: string; timestamp: string }>
}

export interface Financials {
  revenue: {
    monthly: number
    yearly: number
    growth: number
  }
  expenses: {
    monthly: number
    yearly: number
  }
  profit: {
    monthly: number
    yearly: number
    margin: number
  }
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
  date: string
  clientId?: string
}

export interface Media {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio'
  url: string
  size: number
  uploadedAt: string
  tags: string[]
  caseId?: string
  clientId?: string
}
