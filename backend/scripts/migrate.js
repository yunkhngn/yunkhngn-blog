const contentful = require('contentful');
const sequelize = require('../config/database');
const Post = require('../models/Post');
const Photo = require('../models/Photo');
const User = require('../models/User');
require('dotenv').config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

const migrate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    await sequelize.sync(); // Ensure tables exist

    // Create a default admin user if not exists (for authorship)
    const [adminUser] = await User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        firebaseUid: 'migration_admin_placeholder',
        displayName: 'Admin',
        role: 'admin',
      },
    });

    console.log('Fetching entries from Contentful...');
    const entries = await client.getEntries({ limit: 1000 });

    console.log(`Found ${entries.items.length} entries.`);

    for (const item of entries.items) {
      const contentType = item.sys.contentType.sys.id;
      const fields = item.fields;

      if (contentType === 'blogPost' || contentType === 'post') { // Adjust content type ID as needed
        console.log(`Migrating Post: ${fields.title}`);
        
        let coverImage = null;
        if (fields.coverImage && fields.coverImage.fields && fields.coverImage.fields.file) {
            coverImage = 'https:' + fields.coverImage.fields.file.url;
        }

        await Post.create({
          title: fields.title,
          slug: fields.slug,
          content: fields.body || fields.content || '', // Adjust field name
          excerpt: fields.description || fields.excerpt || '',
          coverImage: coverImage,
          published: true,
          publishedAt: item.sys.createdAt,
          authorId: adminUser.id,
        });
      } else if (contentType === 'photo' || contentType === 'gallery') { // Adjust content type ID
         console.log(`Migrating Photo: ${fields.title}`);
         
         let imageUrl = null;
         if (fields.image && fields.image.fields && fields.image.fields.file) {
             imageUrl = 'https:' + fields.image.fields.file.url;
         }

         if (imageUrl) {
             await Photo.create({
                 title: fields.title,
                 description: fields.description,
                 imageUrl: imageUrl,
             });
         }
      }
    }

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
