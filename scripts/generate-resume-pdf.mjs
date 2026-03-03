import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { parse as parseYaml } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function readYaml(relativePath) {
  const filePath = path.join(rootDir, 'src', 'content', relativePath);
  const raw = await fsPromises.readFile(filePath, 'utf8');
  return parseYaml(raw);
}

function addSectionTitle(doc, text) {
  doc.moveDown(1.2);
  doc.font('Helvetica-Bold').fontSize(14).text(text, { underline: false });
  doc.moveDown(0.3);
}

function addParagraph(doc, text) {
  doc.font('Helvetica').fontSize(11).text(text, { align: 'left' });
  doc.moveDown(0.4);
}

function addBullet(doc, text) {
  const indent = 14;
  doc.font('Helvetica').fontSize(10);
  doc.text('\u2022', { continued: true });
  doc.text(' ' + text, {
    width: doc.page.width - doc.page.margins.left - doc.page.margins.right - indent,
    indent,
  });
  doc.moveDown(0.1);
}

async function generateResume() {
  const [
    hero,
    profile,
    experience,
    education,
    skills,
    services,
    products,
    certifications,
  ] = await Promise.all([
    readYaml('hero.yaml'),
    readYaml('profile.yaml'),
    readYaml('experience.yaml'),
    readYaml('education.yaml'),
    readYaml('skills.yaml'),
    readYaml('services.yaml').catch(() => null),
    readYaml('products.yaml').catch(() => null),
    readYaml('certifications.yaml').catch(() => null),
  ]);

  const outputDir = path.join(rootDir, 'public', 'davideperrotta-astro');
  await fsPromises.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'resume.pdf');

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Header: name and role
  doc.font('Helvetica-Bold').fontSize(20).text(hero?.name || '', { align: 'left' });
  if (hero?.role) {
    doc.font('Helvetica').fontSize(12).text(hero.role, { align: 'left' });
  }
  if (hero?.location) {
    doc.font('Helvetica').fontSize(10).fillColor('#555555').text(hero.location, { align: 'left' });
  }
  doc.fillColor('#000000');

  // Profile
  if (profile) {
    addSectionTitle(doc, profile.title || 'Profile');
    if (Array.isArray(profile.paragraphs)) {
      profile.paragraphs.forEach((p) => {
        if (p) addParagraph(doc, p);
      });
    }
  }

  // Work Experience
  if (experience && Array.isArray(experience.positions)) {
    addSectionTitle(doc, experience.title || 'Work Experience');
    experience.positions.forEach((pos) => {
      if (!pos) return;
      if (pos.role) {
        doc.font('Helvetica-Bold').fontSize(11).text(pos.role, { align: 'left' });
      }
      if (pos.meta) {
        doc.font('Helvetica').fontSize(10).fillColor('#555555').text(pos.meta, { align: 'left' });
      }
      doc.fillColor('#000000');
      if (Array.isArray(pos.bullets)) {
        pos.bullets.forEach((b) => {
          if (b) addBullet(doc, b);
        });
      }
      doc.moveDown(0.5);
    });
  }

  // Education
  if (education && Array.isArray(education.entries)) {
    addSectionTitle(doc, education.title || 'Education');
    education.entries.forEach((entry) => {
      if (!entry) return;
      if (entry.title) {
        doc.font('Helvetica-Bold').fontSize(11).text(entry.title, { align: 'left' });
      }
      if (entry.meta) {
        doc.font('Helvetica').fontSize(10).fillColor('#555555').text(entry.meta, { align: 'left' });
      }
      doc.fillColor('#000000');
      doc.moveDown(0.5);
    });
  }

  // Tech Skills (flattened)
  if (skills && Array.isArray(skills.categories)) {
    addSectionTitle(doc, skills.title || 'Tech Skills');
    skills.categories.forEach((cat) => {
      if (!cat) return;
      if (cat.name) {
        doc.font('Helvetica-Bold').fontSize(11).text(cat.name, { align: 'left' });
      }
      if (Array.isArray(cat.items)) {
        const itemsText = cat.items.filter(Boolean).join(' \u00B7 ');
        if (itemsText) {
          doc.font('Helvetica').fontSize(10).text(itemsText, {
            align: 'left',
          });
        }
      }
      doc.moveDown(0.4);
    });
  }

  // Products (optional)
  if (products && Array.isArray(products.items)) {
    addSectionTitle(doc, products.title || 'Products');
    if (products.lead) {
      addParagraph(doc, products.lead);
    }
    products.items.forEach((item) => {
      if (!item) return;
      if (item.title) {
        doc.font('Helvetica-Bold').fontSize(11).text(item.title, { align: 'left' });
      }
      if (item.body) {
        addParagraph(doc, item.body);
      }
      if (Array.isArray(item.tags) && item.tags.length > 0) {
          const tagsText = item.tags.filter(Boolean).join(' \u00B7 ');
        if (tagsText) {
          doc.font('Helvetica').fontSize(9).fillColor('#555555').text(tagsText, {
            align: 'left',
          });
          doc.fillColor('#000000');
        }
      }
      doc.moveDown(0.5);
    });
  }

  // Certifications (optional)
  if (certifications && Array.isArray(certifications.items)) {
    addSectionTitle(doc, certifications.title || 'Certifications');
    certifications.items.forEach((item) => {
      if (item) addBullet(doc, item);
    });
  }

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  // eslint-disable-next-line no-console
  console.log(`Generated resume PDF at ${outputPath}`);
}

generateResume().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to generate resume PDF', err);
  process.exit(1);
});
