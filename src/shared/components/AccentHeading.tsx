import React from 'react';
import { GoldUnderline } from './GoldUnderline';

interface AccentHeadingProps {
  plainText: string;
  accentText: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'hero' | 'section' | 'card';
  className?: string;
  align?: 'left' | 'center' | 'right';
  showUnderline?: boolean;
}

export function AccentHeading({
  plainText,
  accentText,
  tag = 'h2',
  size = 'section',
  className = '',
  align = 'left',
  showUnderline = true,
}: AccentHeadingProps) {
  const Tag = tag;

  const sizeClasses = {
    hero: 'text-5xl sm:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.96]',
    section: 'text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05]',
    card: 'text-xl sm:text-2xl tracking-[-0.02em] leading-tight',
  }[size];

  const alignClasses = {
    left: 'text-left',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <Tag className={`font-bold text-[var(--text)] ${sizeClasses} ${alignClasses} ${className}`}>
      <span>{plainText} </span>
      <span className="relative inline-block">
        <span
          className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)]"
          style={{ letterSpacing: 'normal' }}
        >
          {accentText}
        </span>
        {showUnderline && (
          <span className="absolute -bottom-2 left-0 right-0 w-full pointer-events-none">
            <GoldUnderline className="w-full h-3" />
          </span>
        )}
      </span>
    </Tag>
  );
}
