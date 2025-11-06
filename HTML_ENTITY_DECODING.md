# HTML Entity Decoding Solution

This document explains the app-wide solution for properly rendering HTML entities (like `&amp;`, `&lt;`, etc.) from the Phish API data source.

## Problem

Data from the Phish API sometimes contains HTML entities (e.g., `R&amp;R` instead of `R&R`). React escapes these by default for security, causing them to display incorrectly.

## Solution

We've implemented two complementary approaches:

### 1. HtmlText Component (for React JSX)

**Location:** `/components/html-text.tsx`

**Use this for:** Rendering text in React components

**Example:**
```tsx
import { HtmlText } from '@/components/html-text'

// Basic usage
<HtmlText>{song.song}</HtmlText>

// With className
<HtmlText className="text-xl font-bold">{venue.name}</HtmlText>

// With custom element
<HtmlText as="h1">{song.title}</HtmlText>
```

### 2. decodeHtml Utility Function (for non-React contexts)

**Location:** `/lib/decode-html.ts`

**Use this for:** 
- Chart tick formatters
- Data processing functions
- Non-JSX contexts

**Example:**
```tsx
import { decodeHtml } from '@/lib/decode-html'

// In a chart
<YAxis tickFormatter={decodeHtml} />

// In data processing
const decodedName = decodeHtml(song.name)
```

## Updated Files

The following files have been updated to properly decode HTML entities:

### Pages
- `/app/(most)/song/[slug]/page.tsx` - Song details page
- `/app/(most)/venue/[venueid]/page.tsx` - Venue details page
- `/app/(most)/tour/[tourid]/page.tsx` - Tour details page

### Browse Components
- `/app/(most)/(browse)/[entity]/_components/BrowseSongs.tsx`
- `/app/(most)/(browse)/[entity]/_components/BrowseVenues.tsx`
- `/app/(most)/(browse)/[entity]/_components/BrowseTours.tsx`

### Song Detail Components
- `/app/(most)/song/[slug]/_components/MostPlayedVenues.tsx` - Uses `decodeHtml` for chart
- `/app/(most)/song/[slug]/_components/MostPlayedTours.tsx` - Uses `decodeHtml` for chart

### Venue Detail Components
- `/app/(most)/venue/[venueid]/_components/Tours.tsx`

### Shared Components
- `/components/Debuts.tsx` - Debut songs display
- `/components/LastPlays.tsx` - Last played songs display
- `/components/MostPlayedSongs.tsx` - Uses `decodeHtml` for chart
- `/components/Timeline.tsx` - Uses `decodeHtml` for timeline data
- `/components/search-all.tsx` - Search dialog
- `/components/show-link.tsx` - Show link component

## Best Practices

### When to Use HtmlText

✅ **Use HtmlText when:**
- Rendering text directly in JSX
- Displaying song names, venue names, tour names, etc.
- You need to apply CSS classes to the text

```tsx
<div>
  <HtmlText className="font-bold">{song.name}</HtmlText>
</div>
```

### When to Use decodeHtml

✅ **Use decodeHtml when:**
- Working with chart libraries (Recharts, vis-timeline, etc.)
- Processing data before rendering
- Creating dynamic content strings
- Working in non-React contexts

```tsx
const chartData = songs.map(song => ({
  name: decodeHtml(song.name),
  count: song.count
}))
```

### Security Note

Both solutions use `dangerouslySetInnerHTML` under the hood, which is safe in this context because:
1. The data comes from the trusted Phish API (not user input)
2. We're only decoding HTML entities, not executing scripts
3. The Phish API data doesn't contain malicious content

If you ever need to display user-generated content, DO NOT use these utilities - use proper sanitization instead.

## Adding New Components

When creating new components that display Phish API data:

1. **Import the appropriate utility:**
   ```tsx
   import { HtmlText } from '@/components/html-text'
   // or
   import { decodeHtml } from '@/lib/decode-html'
   ```

2. **Wrap any API text fields:**
   ```tsx
   // Before
   <span>{song.name}</span>
   
   // After
   <HtmlText>{song.name}</HtmlText>
   ```

3. **For charts, use the utility function:**
   ```tsx
   <YAxis tickFormatter={decodeHtml} />
   ```

## Testing

To verify HTML entities are being decoded properly:

1. Look for songs/venues/tours with `&` in their names (like "R&R" or "Rock & Roll")
2. Check that they display with `&` not `&amp;`
3. Verify this works in:
   - Main detail pages
   - Browse lists
   - Search results
   - Charts and graphs
   - Timeline views

## Summary

This solution provides a clean, reusable way to handle HTML entity decoding across your entire app, ensuring consistent display of Phish API data while maintaining security and code cleanliness.

