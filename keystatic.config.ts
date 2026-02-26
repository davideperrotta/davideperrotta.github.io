import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'src/content/hero',
      format: { data: 'yaml' },
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
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || props.fields.url.value || 'New link',
          }
        ),
      },
    }),
    profile: singleton({
      label: 'Profile',
      path: 'src/content/profile',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Profile' }),
        paragraphs: fields.array(
          fields.text({ label: 'Paragraph' }),
          {
            label: 'Paragraphs',
            itemLabel: (props) => (props.value ? `${props.value.slice(0, 40)}${props.value.length > 40 ? '…' : ''}` : 'New paragraph'),
          }
        ),
      },
    }),
    experience: singleton({
      label: 'Experience',
      path: 'src/content/experience',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Work Experience' }),
        positions: fields.array(
          fields.object({
            role: fields.text({ label: 'Role and company' }),
            meta: fields.text({ label: 'Location and dates' }),
            bullets: fields.array(
              fields.text({ label: 'Bullet' }),
              {
                label: 'Responsibilities',
                itemLabel: (props) => (props.value ? `${props.value.slice(0, 40)}${props.value.length > 40 ? '…' : ''}` : 'New responsibility'),
              }
            ),
          }),
          {
            label: 'Positions',
            itemLabel: (props) => props.fields.role.value || 'New position',
          }
        ),
        showMoreLabel: fields.text({ label: 'Show more label', defaultValue: 'Show more' }),
        showLessLabel: fields.text({ label: 'Show less label', defaultValue: 'Show less' }),
      },
    }),
    education: singleton({
      label: 'Education',
      path: 'src/content/education',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Education' }),
        entries: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            meta: fields.text({ label: 'Meta' }),
          }),
          {
            label: 'Entries',
            itemLabel: (props) => props.fields.title.value || props.fields.meta.value || 'New entry',
          }
        ),
      },
    }),
    skills: singleton({
      label: 'Skills',
      path: 'src/content/skills',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Tech Skills' }),
        categories: fields.array(
          fields.object({
            name: fields.text({ label: 'Category name' }),
            items: fields.array(
              fields.text({ label: 'Skill' }),
              {
                label: 'Skills',
                itemLabel: (props) => props.value || 'Skill',
              }
            ),
          }),
          {
            label: 'Categories',
            itemLabel: (props) => props.fields.name.value || 'New category',
          }
        ),
      },
    }),
    services: singleton({
      label: 'Services',
      path: 'src/content/services',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Most Requested Services' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          }
        ),
      },
    }),
    news: singleton({
      label: 'News',
      path: 'src/content/news',
      format: { data: 'yaml' },
      schema: {
        items: fields.array(
          fields.object({
            date: fields.date({ label: 'Date' }),
            text: fields.text({ label: 'Post', multiline: true }),
          }),
          {
            label: 'News items',
            itemLabel: (props) =>
              (props.fields.text.value
                ? `${props.fields.text.value.slice(0, 40)}${props.fields.text.value.length > 40 ? '…' : ''}`
                : props.fields.date.value) || 'News item',
          }
        ),
      },
    }),
    links: singleton({
      label: 'Links',
      path: 'src/content/links',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Links' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || props.fields.url.value || 'New link',
          }
        ),
      },
    }),
    certifications: singleton({
      label: 'Certifications',
      path: 'src/content/certifications',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Certifications' }),
        items: fields.array(
          fields.text({ label: 'Certification' }),
          {
            label: 'Items',
            itemLabel: (props) => props.value || 'Certification',
          }
        ),
      },
    }),
  },
});
