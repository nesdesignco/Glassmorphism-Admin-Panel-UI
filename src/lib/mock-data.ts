// Stats Data
export const statsData = {
  courses: {
    total: 24,
    active: 3,
    upcoming: 1,
  },
  lessons: {
    total: 220,
    active: 20,
    upcoming: 4,
  },
  enrollments: {
    total: 67,
    passed: 60,
    new: 7,
  },
  students: {
    total: 17,
    active: 12,
    new: 5,
  },
}

// Revenue Data for Chart
export const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 4900 },
  { month: 'Apr', revenue: 6200 },
  { month: 'May', revenue: 5400 },
  { month: 'Jun', revenue: 7800 },
  { month: 'Jul', revenue: 12400 },
  { month: 'Aug', revenue: 9200 },
  { month: 'Sep', revenue: 8600 },
  { month: 'Oct', revenue: 7400 },
  { month: 'Nov', revenue: 8900 },
  { month: 'Dec', revenue: 10200 },
]

// Withdrawal Requests
export const withdrawalRequests = [
  { id: 1, email: 'bockeiboy@att.net', name: 'Aria Bailey', amount: 5.22, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, email: 'adamk@yahoo.com', name: 'Thomas Garcia', amount: 14.81, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, email: 'groischie@mac.com', name: 'Ariana Baker', amount: 11.70, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 4, email: 'sinclair@att.net', name: 'Ethan Hernandez', amount: 17.84, avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
]

// Top Courses
export const topCourses = [
  { id: 1, name: 'Data Science and Machine Learning', sales: 12, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop' },
  { id: 2, name: 'Full Stack Web Development', sales: 16, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop' },
  { id: 3, name: 'Blockchain Technology', sales: 5, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop' },
  { id: 4, name: 'User Experience (UX) Design', sales: 8, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop' },
]

// Course Overview Data - Colors handled by theme system
export const courseOverviewData = [
  { name: 'XII Crash Course', value: 27 },
  { name: 'Digital Marketing', value: 18 },
  { name: 'Code Learning', value: 15 },
  { name: 'UX/UI Designing', value: 12 },
  { name: 'AI & Prompt Learning', value: 10 },
  { name: 'Web Designing Best', value: 8 },
]

// All Courses
export const coursesData = [
  { id: 1, name: 'Data Science and Machine Learning', category: 'Technology', students: 156, price: 99.99, status: 'active', instructor: 'John Doe', rating: 4.8, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop' },
  { id: 2, name: 'Full Stack Web Development', category: 'Development', students: 234, price: 149.99, status: 'active', instructor: 'Jane Smith', rating: 4.9, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop' },
  { id: 3, name: 'Blockchain Technology', category: 'Technology', students: 89, price: 129.99, status: 'active', instructor: 'Mike Johnson', rating: 4.7, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop' },
  { id: 4, name: 'User Experience (UX) Design', category: 'Design', students: 178, price: 79.99, status: 'active', instructor: 'Sarah Wilson', rating: 4.6, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop' },
  { id: 5, name: 'Digital Marketing Mastery', category: 'Marketing', students: 312, price: 89.99, status: 'active', instructor: 'Tom Brown', rating: 4.5, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop' },
  { id: 6, name: 'Python for Beginners', category: 'Development', students: 445, price: 49.99, status: 'active', instructor: 'Emily Davis', rating: 4.8, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop' },
  { id: 7, name: 'Advanced React Patterns', category: 'Development', students: 123, price: 119.99, status: 'draft', instructor: 'Chris Lee', rating: 4.9, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop' },
  { id: 8, name: 'Cloud Computing AWS', category: 'Technology', students: 98, price: 159.99, status: 'active', instructor: 'Alex Turner', rating: 4.7, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop' },
]

// Bootcamps
export const bootcampsData = [
  { id: 1, name: 'Full Stack Bootcamp 2025', duration: '12 weeks', participants: 45, startDate: '2025-01-15', status: 'upcoming', price: 2999, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop' },
  { id: 2, name: 'Data Science Intensive', duration: '8 weeks', participants: 32, startDate: '2024-12-01', status: 'active', price: 2499, image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100&h=100&fit=crop' },
  { id: 3, name: 'UX/UI Design Sprint', duration: '6 weeks', participants: 28, startDate: '2025-02-01', status: 'upcoming', price: 1999, image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=100&h=100&fit=crop' },
  { id: 4, name: 'DevOps Engineering', duration: '10 weeks', participants: 20, startDate: '2024-11-15', status: 'active', price: 2799, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=100&h=100&fit=crop' },
]

// Team Training
export const teamTrainingData = [
  { id: 1, company: 'Tech Corp', program: 'Leadership Development', employees: 25, progress: 75, startDate: '2024-10-01', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop' },
  { id: 2, company: 'Innovation Labs', program: 'Agile Methodology', employees: 40, progress: 45, startDate: '2024-11-01', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop' },
  { id: 3, company: 'Digital Solutions', program: 'Cloud Architecture', employees: 15, progress: 90, startDate: '2024-09-15', image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=100&h=100&fit=crop' },
  { id: 4, company: 'StartUp Inc', program: 'Product Management', employees: 12, progress: 30, startDate: '2024-11-20', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop' },
]

// E-Books
export const ebooksData = [
  { id: 1, title: 'Mastering React 2025', author: 'John Doe', price: 29.99, sales: 456, category: 'Development', rating: 4.8, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop' },
  { id: 2, title: 'Python Data Science Handbook', author: 'Jane Smith', price: 34.99, sales: 678, category: 'Data Science', rating: 4.9, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&h=100&fit=crop' },
  { id: 3, title: 'UX Design Principles', author: 'Sarah Wilson', price: 24.99, sales: 234, category: 'Design', rating: 4.6, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop' },
  { id: 4, title: 'DevOps Best Practices', author: 'Mike Johnson', price: 39.99, sales: 189, category: 'DevOps', rating: 4.7, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=100&h=100&fit=crop' },
  { id: 5, title: 'Machine Learning A-Z', author: 'Emily Davis', price: 44.99, sales: 567, category: 'AI/ML', rating: 4.8, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop' },
]

// Enrollments
export const enrollmentsData = [
  { id: 1, student: 'Alice Johnson', email: 'alice@email.com', course: 'Full Stack Web Development', date: '2024-12-01', status: 'active', amount: 149.99, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, student: 'Bob Smith', email: 'bob@email.com', course: 'Data Science and Machine Learning', date: '2024-12-02', status: 'pending', amount: 99.99, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, student: 'Carol White', email: 'carol@email.com', course: 'UX Design', date: '2024-12-03', status: 'active', amount: 79.99, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 4, student: 'David Brown', email: 'david@email.com', course: 'Blockchain Technology', date: '2024-12-04', status: 'completed', amount: 129.99, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 5, student: 'Eva Martinez', email: 'eva@email.com', course: 'Digital Marketing', date: '2024-12-05', status: 'active', amount: 89.99, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
]

// Affiliate Data
export const affiliateData = [
  { id: 1, name: 'John Partner', email: 'john@partner.com', referrals: 45, earnings: 1250.50, status: 'active', joinDate: '2024-06-15', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 2, name: 'Sarah Affiliate', email: 'sarah@aff.com', referrals: 78, earnings: 2340.75, status: 'active', joinDate: '2024-03-20', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: 3, name: 'Mike Promoter', email: 'mike@promo.com', referrals: 23, earnings: 567.25, status: 'pending', joinDate: '2024-09-01', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { id: 4, name: 'Lisa Referrer', email: 'lisa@ref.com', referrals: 156, earnings: 4890.00, status: 'active', joinDate: '2024-01-10', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
]

// Users
export const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15', courses: 5, avatar: 'https://randomuser.me/api/portraits/men/21.jpg' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', status: 'active', joinDate: '2024-02-20', courses: 12, avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'active', joinDate: '2024-03-10', courses: 3, avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Instructor', status: 'active', joinDate: '2024-04-05', courses: 8, avatar: 'https://randomuser.me/api/portraits/women/24.jpg' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Student', status: 'inactive', joinDate: '2024-05-15', courses: 2, avatar: 'https://randomuser.me/api/portraits/men/25.jpg' },
]

// Reports Data
export const monthlyRevenueReport = [
  { month: 'Jan', courses: 12500, ebooks: 3400, bootcamps: 8900 },
  { month: 'Feb', courses: 15200, ebooks: 4100, bootcamps: 9800 },
  { month: 'Mar', courses: 14800, ebooks: 3800, bootcamps: 11200 },
  { month: 'Apr', courses: 18500, ebooks: 5200, bootcamps: 12500 },
  { month: 'May', courses: 16900, ebooks: 4600, bootcamps: 10800 },
  { month: 'Jun', courses: 21200, ebooks: 6100, bootcamps: 14200 },
]

export const userActivityReport = [
  { day: 'Mon', logins: 245, enrollments: 12, completions: 8 },
  { day: 'Tue', logins: 312, enrollments: 18, completions: 14 },
  { day: 'Wed', logins: 287, enrollments: 15, completions: 11 },
  { day: 'Thu', logins: 356, enrollments: 22, completions: 16 },
  { day: 'Fri', logins: 298, enrollments: 19, completions: 13 },
  { day: 'Sat', logins: 189, enrollments: 8, completions: 6 },
  { day: 'Sun', logins: 156, enrollments: 5, completions: 4 },
]

// Navigation Items
export const navigationItems = [
  { name: 'Home', href: '/', icon: 'Home' },
  { name: 'Courses', href: '/courses', icon: 'BookOpen', hasSubmenu: true },
  { name: 'Bootcamp', href: '/bootcamp', icon: 'Rocket', hasSubmenu: true },
  { name: 'Team Training', href: '/team-training', icon: 'Users', hasSubmenu: true },
  { name: 'EBook', href: '/ebooks', icon: 'Book', hasSubmenu: true },
  { name: 'Enrollments', href: '/enrollments', icon: 'UserPlus', hasSubmenu: true },
  { name: 'Reports', href: '/reports', icon: 'BarChart3', hasSubmenu: true },
  { name: 'Affiliate', href: '/affiliate', icon: 'Share2', hasSubmenu: true },
  { name: 'Users', href: '/users', icon: 'User' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
]
