# Mettyerng - Modern Khmer Organization Website

A modern, responsive website for the Mettyerng Khmer community organization, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Clean, professional design with Khmer cultural elements
- **Responsive**: Fully responsive design that works on all devices
- **Multilingual**: Content in both Khmer and English
- **Performance**: Optimized for speed and SEO
- **Accessibility**: Built with accessibility best practices
- **Interactive**: Smooth animations and micro-interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Carousel**: Swiper.js
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── gallery/           # Photo gallery
│   ├── news/              # News and events
│   ├── projects/          # Projects showcase
│   ├── structure/         # Organization structure
│   ├── videos/            # Video gallery
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   ├── header.tsx    # Navigation header
│   │   └── footer.tsx    # Site footer
│   ├── ui/               # UI components (shadcn/ui)
│   └── hero-carousel.tsx # Homepage carousel
├── lib/                  # Utility functions and data
│   ├── data/            # Mock data and data management
│   ├── validations/     # Form validation schemas
│   ├── constants.ts     # Site configuration
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
└── public/              # Static assets
```

## 🎨 Design System

### Colors
- **Primary Gold**: `#D4AF37` (Khmer Gold)
- **Primary Red**: `#C41E3A` (Khmer Red)
- **Primary Blue**: `#1E40AF` (Khmer Blue)
- **Neutral Grays**: Various shades for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good line spacing

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with proper validation
- **Navigation**: Responsive with mobile drawer

## 📱 Pages Overview

1. **Homepage** (`/`): Hero carousel, stats, mission, features, CTA
2. **About** (`/about`): Mission, vision, values, timeline, team
3. **Structure** (`/structure`): Organization chart with expandable sections
4. **News** (`/news`): News articles with filtering and search
5. **Videos** (`/videos`): Video gallery with modal player
6. **Projects** (`/projects`): Project showcase with detailed views
7. **Gallery** (`/gallery`): Photo gallery with lightbox
8. **Contact** (`/contact`): Contact form and information

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mettyerng-website.git
   cd mettyerng-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development

### Adding New Components
```bash
npx shadcn-ui@latest add [component-name]
```

### Code Style
- Use TypeScript for all components
- Follow the existing naming conventions
- Add proper type definitions
- Use Tailwind CSS for styling
- Implement responsive design

### Performance Optimization
- Use Next.js Image component for images
- Implement lazy loading for heavy components
- Optimize bundle size with dynamic imports
- Use proper caching strategies

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Static Export
```bash
npm run build && npm run export
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Mettyerng Organization** for the opportunity
- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Pexels** for high-quality stock photos

## 📞 Support

For support, email info@mettyerng.org or create an issue in this repository.