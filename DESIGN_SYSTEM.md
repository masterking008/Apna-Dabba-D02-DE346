# Apna Dabba Design System

## Overview
This design system ensures consistency, accessibility, and modern aesthetics across the Apna Dabba application.

## Typography Scale

### Headings
- `.text-display` - 36px, bold, tight leading (Hero sections)
- `.text-heading-1` - 30px, bold (Page titles)
- `.text-heading-2` - 24px, semibold (Section titles)
- `.text-heading-3` - 20px, semibold (Subsections)
- `.text-heading` - 18px, semibold (Card titles)

### Body Text
- `.text-body` - 16px, normal (Main content)
- `.text-body-sm` - 14px, normal (Secondary content)
- `.text-caption` - 12px, medium (Labels, captions)
- `.text-subtext` - Muted color for secondary text

## Color Palette

### Primary Colors
- `primary-50` to `primary-900` - Main brand colors
- Primary 500 (#114A42) is the main brand color

### Neutral Colors
- `neutral-50` to `neutral-900` - Grays for text and backgrounds
- Background: `neutral-50` (#F7F8FA)

### Status Colors
- `success-*` - Green for success states
- `warning-*` - Amber for warnings
- `error-*` - Red for errors
- `info-*` - Blue for information

## Components

### Buttons
- `.btn` - Base button class
- `.btn-primary` - Primary actions
- `.btn-secondary` - Secondary actions
- `.btn-outline` - Outlined buttons
- `.btn-ghost` - Minimal buttons
- `.btn-sm` / `.btn-lg` - Size variants

### Cards
- `.card` - Standard card with hover effects
- `.card-elevated` - Card with stronger shadow
- `.card-compact` - Smaller padding

### Form Elements
- `.input` - Standard input field with focus states

## Layout

### Containers
- `.container` - Max-width container with responsive padding
- `.section` - Standard section padding
- `.grid-responsive` - Responsive grid layout

### Spacing
- Consistent 4px base unit
- Use Tailwind spacing scale (4, 6, 8, 12, 16, 24, etc.)

## Animations
- `.animate-fade-in` - Smooth entrance animation
- Hover effects on interactive elements
- Smooth transitions (200ms duration)

## Best Practices

1. **Mobile First**: Design for mobile, enhance for desktop
2. **Accessibility**: Minimum 44px touch targets, proper contrast
3. **Performance**: Use CSS variables for consistent theming
4. **Consistency**: Always use design system classes
5. **Loading States**: Include skeleton loaders for better UX

## Usage Examples

```tsx
// Page Header
<div className="bg-white shadow-sm border-b border-neutral-200">
  <div className="container py-6">
    <h1 className="text-heading-1 mb-2">Page Title</h1>
    <p className="text-body-sm text-subtext">Description</p>
  </div>
</div>

// Card Component
<div className="card">
  <h3 className="text-heading mb-4">Card Title</h3>
  <p className="text-body mb-6">Card content</p>
  <button className="btn btn-primary">Action</button>
</div>

// Form
<form className="space-y-4">
  <input className="input" placeholder="Enter text" />
  <button className="btn btn-primary w-full">Submit</button>
</form>
```

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS Custom Properties support required