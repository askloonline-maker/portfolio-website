import React from 'react';

interface Topic {
  id: string;
  name: string;
  slug: string;
  isActive?: boolean;
}

interface ActiveTopicsSidebarProps {
  topics?: Topic[];
  activeTopicSlug?: string;
  onTopicClick?: (slug: string) => void;
}

export default function ActiveTopicsSidebar({
  topics = [],
  activeTopicSlug,
  onTopicClick,
}: ActiveTopicsSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="topics-container">
        <h3>Topics</h3>
        <ul className="topics-list">
          {topics.map((topic) => (
            <li
              key={topic.id}
              className={`topic-item ${
                activeTopicSlug === topic.slug ? 'active' : ''
              }`}
              onClick={() => onTopicClick?.(topic.slug)}
            >
              <a href={`/topics/${topic.slug}`}>{topic.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
