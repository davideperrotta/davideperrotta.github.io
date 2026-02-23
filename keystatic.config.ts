import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'src/content/hero',
      schema: {
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role' }),
        location: fields.text({ label: 'Location' }),
        avatarUrl: fields.text({ label: 'Avatar URL' }),
        bornLabel: fields.text({ label: 'Born label', defaultValue: 'Born' }),
        bornValue: fields.text({ label: 'Born value' }),
        degreeLabel: fields.text({ label: 'Degree label', defaultValue: 'Degree' }),
        degreeValue: fields.text({ label: 'Degree value' }),
        experienceLabel: fields.text({ label: 'Experience label', defaultValue: 'Experience' }),
        experienceValue: fields.text({ label: 'Experience value' }),
        languagesLabel: fields.text({ label: 'Languages label', defaultValue: 'Languages' }),
        languagesValue: fields.text({ label: 'Languages value' }),
        hobbiesLabel: fields.text({ label: 'Hobbies label', defaultValue: 'Hobbies' }),
        hobbiesValue: fields.text({ label: 'Hobbies value' }),
        sportsLabel: fields.text({ label: 'Sports label', defaultValue: 'Sports' }),
        sportsValue: fields.text({ label: 'Sports value' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL' }),
          }),
          { label: 'Links' }
        ),
      },
    }),
    profile: singleton({
      label: 'Profile',
      path: 'src/content/profile',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Profile' }),
        paragraphs: fields.array(
          fields.text({ label: 'Paragraph' }),
          { label: 'Paragraphs' }
        ),
      },
    }),
    experience: singleton({
      label: 'Experience',
      path: 'src/content/experience',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Work Experience' }),
        positions: fields.array(
          fields.object({
            role: fields.text({ label: 'Role and company' }),
            meta: fields.text({ label: 'Location and dates' }),
            bullets: fields.array(
              fields.text({ label: 'Bullet' }),
              { label: 'Responsibilities' }
            ),
          }),
          { label: 'Positions' }
        ),
        showMoreLabel: fields.text({ label: 'Show more label', defaultValue: 'Show more' }),
        showLessLabel: fields.text({ label: 'Show less label', defaultValue: 'Show less' }),
      },
    }),
    education: singleton({
      label: 'Education',
      path: 'src/content/education',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Education' }),
        entries: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            meta: fields.text({ label: 'Meta' }),
          }),
          { label: 'Entries' }
        ),
      },
    }),
    skills: singleton({
      label: 'Skills',
      path: 'src/content/skills',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Tech Skills' }),
        categories: fields.array(
          fields.object({
            name: fields.text({ label: 'Category name' }),
            items: fields.array(
              fields.text({ label: 'Skill' }),
              { label: 'Skills' }
            ),
          }),
          { label: 'Categories' }
        ),
      },
    }),
    services: singleton({
      label: 'Services',
      path: 'src/content/services',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Most Requested Services' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags' }
        ),
      },
    }),
    links: singleton({
      label: 'Links',
      path: 'src/content/links',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Links' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL' }),
          }),
          { label: 'Links' }
        ),
      },
    }),
    certifications: singleton({
      label: 'Certifications',
      path: 'src/content/certifications',
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Certifications' }),
        items: fields.array(
          fields.text({ label: 'Certification' }),
          { label: 'Items' }
        ),
      },
    }),
  },
});
