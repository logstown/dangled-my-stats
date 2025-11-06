import React from 'react'

interface HtmlTextProps {
  children: string
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * Component to safely render text with HTML entities decoded.
 * Use this for displaying data from the Phish API that may contain HTML entities like &amp;
 *
 * @example
 * <HtmlText>R&amp;R</HtmlText> // Renders as: R&R
 * <HtmlText className="text-xl" as="span">Rock &amp; Roll</HtmlText>
 */
export function HtmlText({
  children,
  className,
  as: Component = 'span',
}: HtmlTextProps) {
  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
