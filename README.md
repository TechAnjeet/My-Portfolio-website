# My-Portfolio-website
Academic web project developed as part of diploma coursework using HTML, CSS, and JavaScript.
# Anjeet Tech 2.0 - Modern Portfolio Website

A stunning, modern, and fully-featured portfolio website with complete frontend and backend functionality. Built with vanilla HTML, CSS, and JavaScript, featuring a powerful admin panel for content management.

## 🚀 Live Demo

- **Main Website**: [View Portfolio](index.html)
- **Admin Panel**: [Access Admin](admin.html)

## ✨ Features

### Frontend Features
- **Hero Section** with animated typing effect and morphing profile image
- **About Section** with animated statistics and contact information
- **Skills Section** with filterable skill cards and progress bars
- **Projects Section** with category filtering and load more functionality
- **Testimonials Section** with auto-rotating slider
- **Contact Form** with backend integration
- **Smooth Animations** using AOS (Animate On Scroll)
- **Fully Responsive** design for all devices
- **Modern UI/UX** with gradient effects and smooth transitions
- **Social Media Integration** with customizable links

### Backend Features
- **RESTful API Integration** for all data operations
- **Dynamic Content Loading** from database
- **Real-time Updates** without page refresh
- **CRUD Operations** for all content types
- **Contact Message Storage** and management
- **Profile Management** system
- **Skills Management** with categories and levels
- **Projects Management** with images and links
- **Testimonials Management** with ratings

### Admin Panel Features
- **Modern Dashboard** with sidebar navigation
- **Profile Management** - Update personal information and social links
- **Skills Management** - Add, edit, delete skills with categories
- **Projects Management** - Manage portfolio projects with images
- **Testimonials Management** - Handle client testimonials and ratings
- **Messages Center** - View and manage contact form submissions
- **Real-time Notifications** - Toast messages for actions
- **Responsive Design** - Works on all devices
- **Easy to Use** - Intuitive interface for content management

## 📋 Currently Completed Features

### ✅ Fully Implemented
1. **Profile System** - Complete profile management with all fields
2. **Skills Database** - Skills with categories, levels, and icons
3. **Projects Portfolio** - Project showcase with images and links
4. **Testimonials System** - Client testimonials with ratings
5. **Contact Form** - Message submission and storage
6. **Admin Panel** - Full CRUD operations for all content
7. **Responsive Design** - Mobile, tablet, and desktop optimized
8. **Animations** - Smooth scroll animations and transitions
9. **API Integration** - RESTful backend for all operations

## 🎯 Functional Entry Points (URIs)

### Main Website Routes
| Route | Description | Parameters |
|-------|-------------|------------|
| `/index.html` | Main portfolio homepage | None |
| `/admin.html` | Admin panel for content management | None |

### API Endpoints

#### Profile
- `GET tables/profile?limit=1` - Get profile data
- `POST tables/profile` - Create profile
- `PUT tables/profile/{id}` - Update profile

#### Skills
- `GET tables/skills?limit=100&sort=order` - List all skills
- `GET tables/skills/{id}` - Get single skill
- `POST tables/skills` - Create skill
- `PUT tables/skills/{id}` - Update skill
- `DELETE tables/skills/{id}` - Delete skill

#### Projects
- `GET tables/projects?page={page}&limit={limit}&sort=order` - List projects (paginated)
- `GET tables/projects/{id}` - Get single project
- `POST tables/projects` - Create project
- `PUT tables/projects/{id}` - Update project
- `DELETE tables/projects/{id}` - Delete project

#### Testimonials
- `GET tables/testimonials?limit=100&sort=order` - List all testimonials
- `GET tables/testimonials/{id}` - Get single testimonial
- `POST tables/testimonials` - Create testimonial
- `PUT tables/testimonials/{id}` - Update testimonial
- `DELETE tables/testimonials/{id}` - Delete testimonial

#### Contact Messages
- `GET tables/contact_messages?limit=100` - List all messages
- `GET tables/contact_messages/{id}` - Get single message
- `POST tables/contact_messages` - Submit contact form
- `PATCH tables/contact_messages/{id}` - Update message status
- `DELETE tables/contact_messages/{id}` - Delete message

## 📊 Data Models

### Profile Schema
```javascript
{
  id: "text",              // Unique identifier
  name: "text",            // Full name
  title: "text",           // Professional title
  bio: "rich_text",        // Biography/About text
  email: "text",           // Contact email
  phone: "text",           // Contact phone
  location: "text",        // Location
  avatar_url: "text",      // Profile picture URL
  resume_url: "text",      // Resume/CV URL
  github_url: "text",      // GitHub profile
  linkedin_url: "text",    // LinkedIn profile
  twitter_url: "text",     // Twitter profile
  instagram_url: "text"    // Instagram profile
}
```

### Skills Schema
```javascript
{
  id: "text",              // Unique identifier
  name: "text",            // Skill name
  category: "text",        // Category (Frontend, Backend, Tools, Other)
  level: "number",         // Skill level (0-100)
  icon: "text",            // Icon class (Font Awesome)
  order: "number"          // Display order
}
```

### Projects Schema
```javascript
{
  id: "text",              // Unique identifier
  title: "text",           // Project title
  description: "rich_text",// Project description
  image_url: "text",       // Project image URL
  demo_url: "text",        // Live demo URL
  github_url: "text",      // GitHub repository URL
  technologies: "array",   // Technologies used
  category: "text",        // Project category
  featured: "bool",        // Is featured project
  order: "number"          // Display order
}
```

### Testimonials Schema
```javascript
{
  id: "text",              // Unique identifier
  name: "text",            // Client name
  position: "text",        // Job title
  company: "text",         // Company name
  content: "rich_text",    // Testimonial content
  avatar_url: "text",      // Avatar image URL
  rating: "number",        // Rating (1-5)
  featured: "bool",        // Is featured testimonial
  order: "number"          // Display order
}
```

### Contact Messages Schema
```javascript
{
  id: "text",              // Unique identifier
  name: "text",            // Sender name
  email: "text",           // Sender email
  subject: "text",         // Message subject
  message: "rich_text",    // Message content
  status: "text",          // Status (new, read, replied)
  read: "bool"             // Has been read
}
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Dynamic functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Inter & Poppins)
- **AOS Library** - Scroll animations

### Backend/Storage
- **RESTful Table API** - Data persistence
- **JSON** - Data format
- **Fetch API** - HTTP requests

### Libraries & Tools
- Font Awesome 6.4.0
- AOS (Animate On Scroll) 2.3.4
- Google Fonts (Inter & Poppins)

## 📁 Project Structure

```
anjeet-tech-2.0/
├── index.html           # Main portfolio page
├── admin.html          # Admin panel page
├── css/
│   ├── style.css       # Main website styles
│   └── admin.css       # Admin panel styles
├── js/
│   ├── main.js         # Main website functionality
│   └── admin.js        # Admin panel functionality
└── README.md           # Documentation
```

## 🚀 Getting Started

### Viewing the Website
1. Open `index.html` in your web browser
2. The website will automatically load data from the backend
3. Navigate through different sections using the menu

### Using the Admin Panel
1. Open `admin.html` in your web browser
2. Navigate through different sections using the sidebar
3. Manage your content:
   - **Profile**: Update your personal information
   - **Skills**: Add, edit, or delete your skills
   - **Projects**: Manage your portfolio projects
   - **Testimonials**: Handle client testimonials
   - **Messages**: View contact form submissions

### Adding/Editing Content

#### Update Profile
1. Go to Admin Panel → Profile
2. Fill in your information
3. Add social media links
4. Click "Save Profile"

#### Add Skills
1. Go to Admin Panel → Skills
2. Click "Add Skill"
3. Enter skill details (name, category, level, icon)
4. Save

#### Add Projects
1. Go to Admin Panel → Projects
2. Click "Add Project"
3. Enter project details
4. Add image URL and links
5. Save

#### Add Testimonials
1. Go to Admin Panel → Testimonials
2. Click "Add Testimonial"
3. Enter client details and testimonial
4. Set rating
5. Save

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css` and `css/admin.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more colors */
}
```

### Fonts
Update the Google Fonts import in HTML files:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Images
Replace image URLs in the admin panel or directly in the database

## 🔧 Features Not Yet Implemented

None - All core features are fully implemented! 🎉

## 📈 Recommended Next Steps

While the portfolio is feature-complete, here are optional enhancements you could consider:

1. **Blog System**
   - Add a blog section with articles
   - Create blog post management in admin
   - Add tags and categories

2. **Contact Form Email Integration**
   - Integrate with email service (requires backend)
   - Send confirmation emails to visitors
   - Get notifications for new messages

3. **Analytics Integration**
   - Add Google Analytics or similar
   - Track visitor behavior
   - Monitor performance metrics

4. **SEO Enhancements**
   - Add meta tags management
   - Create sitemap.xml
   - Implement structured data

5. **Performance Optimization**
   - Add lazy loading for images
   - Implement service worker for PWA
   - Add image compression

6. **Additional Features**
   - Dark/Light theme toggle
   - Multi-language support
   - Export portfolio as PDF
   - Social media sharing buttons

7. **Security Enhancements**
   - Add authentication for admin panel
   - Implement rate limiting
   - Add CAPTCHA to contact form

## 💡 Tips for Use

1. **Keep Content Updated**: Regularly update your profile, projects, and skills
2. **Use High-Quality Images**: Ensure all images are optimized and professional
3. **Get Testimonials**: Reach out to clients for authentic testimonials
4. **Monitor Messages**: Check the admin panel regularly for new contact messages
5. **Backup Data**: Export your data periodically as backup

## 🐛 Troubleshooting

### Data Not Loading?
- Check browser console for errors
- Ensure you're accessing the site through a web server (not file://)
- Clear browser cache and reload

### Admin Panel Not Working?
- Make sure JavaScript is enabled
- Check browser console for errors
- Try in a different browser

### Forms Not Submitting?
- Check network tab in browser dev tools
- Ensure API endpoints are accessible
- Verify data format is correct

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or issues, please contact via the contact form on the website or open an issue in the repository.

## 🌟 Features Highlight

- ✅ Modern, attractive design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Complete backend integration
- ✅ Easy-to-use admin panel
- ✅ Real-time content updates
- ✅ Smooth animations and transitions
- ✅ Professional UI/UX
- ✅ SEO-friendly structure
- ✅ Fast loading times
- ✅ Cross-browser compatible

---

**Built with ❤️ by Anjeet Tech 2.0**

*This is a complete, production-ready portfolio website with both frontend and backend functionality!*
