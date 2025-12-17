'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get admin user ID
    const adminUser = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (adminUser.length === 0) {
      throw new Error('No admin user found. Please create an admin user first.');
    }

    const adminId = adminUser[0].id;

    await queryInterface.bulkInsert('blogs', [
      {
        title: 'The Future of Transportation Technology',
        slug: 'future-of-transportation-technology',
        excerpt: 'Exploring how AI, IoT, and blockchain are revolutionizing the transport industry with smart logistics solutions.',
        content: `
          <h2>Introduction</h2>
          <p>The transportation industry is experiencing a technological revolution that's reshaping how we move goods and people around the world. From artificial intelligence to blockchain technology, innovative solutions are making logistics smarter, more efficient, and environmentally sustainable.</p>
          
          <h2>Artificial Intelligence in Logistics</h2>
          <p>AI is transforming route optimization, predictive maintenance, and demand forecasting. Machine learning algorithms can analyze traffic patterns, weather conditions, and historical data to determine the most efficient routes, reducing fuel costs and delivery times.</p>
          
          <h2>Internet of Things (IoT) Integration</h2>
          <p>IoT sensors provide real-time tracking and monitoring capabilities, allowing businesses to track shipments, monitor vehicle health, and ensure cargo security throughout the supply chain.</p>
          
          <h2>Blockchain for Supply Chain Transparency</h2>
          <p>Blockchain technology ensures transparency and trust in supply chains by creating immutable records of transactions and shipment movements.</p>
          
          <h2>Conclusion</h2>
          <p>The future of transportation lies in the integration of these technologies, creating a more connected, efficient, and sustainable logistics ecosystem.</p>
        `,
        featured_image: '/images/1.jpg',
        category: 'Technology',
        tags: 'AI, IoT, Blockchain, Transportation, Logistics',
        author_id: adminId,
        status: 'published',
        meta_title: 'Future of Transportation Technology | Smart Logistics',
        meta_description: 'Discover how AI, IoT, and blockchain are revolutionizing transportation and logistics with smart, efficient solutions.',
        published_at: new Date('2024-12-01'),
        views: 1250,
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-01')
      },
      {
        title: 'Sustainable Freight Solutions for Modern Business',
        slug: 'sustainable-freight-solutions-modern-business',
        excerpt: 'Learn how businesses are adopting eco-friendly transportation methods to reduce carbon footprint while maintaining efficiency.',
        content: `
          <h2>The Need for Sustainable Transportation</h2>
          <p>With growing environmental concerns and regulatory pressures, businesses are increasingly looking for sustainable freight solutions that don't compromise on efficiency or cost-effectiveness.</p>
          
          <h2>Electric and Hybrid Vehicles</h2>
          <p>The adoption of electric and hybrid commercial vehicles is growing rapidly, offering significant reductions in emissions and operating costs.</p>
          
          <h2>Route Optimization and Load Planning</h2>
          <p>Smart route planning and load optimization software helps reduce unnecessary mileage and maximize vehicle capacity, leading to fewer trips and lower emissions.</p>
          
          <h2>Alternative Fuels</h2>
          <p>Hydrogen fuel cells, biofuels, and compressed natural gas are emerging as viable alternatives to traditional diesel fuel.</p>
          
          <h2>Green Logistics Practices</h2>
          <p>Implementing sustainable packaging, consolidating shipments, and choosing eco-friendly transportation partners are key strategies for green logistics.</p>
        `,
        featured_image: '/images/2.jpg',
        category: 'Sustainability',
        tags: 'Sustainability, Green Logistics, Electric Vehicles, Environment',
        author_id: adminId,
        status: 'published',
        meta_title: 'Sustainable Freight Solutions | Green Transportation',
        meta_description: 'Explore sustainable freight solutions and eco-friendly transportation methods for modern businesses.',
        published_at: new Date('2024-11-28'),
        views: 980,
        createdAt: new Date('2024-11-28'),
        updatedAt: new Date('2024-11-28')
      },
      {
        title: 'Optimizing Supply Chain Management in 2024',
        slug: 'optimizing-supply-chain-management-2024',
        excerpt: 'Best practices and strategies for optimizing supply chain operations in the current business environment.',
        content: `
          <h2>Current Supply Chain Challenges</h2>
          <p>Today's supply chains face unprecedented challenges including global disruptions, labor shortages, and changing consumer expectations.</p>
          
          <h2>Digital Transformation</h2>
          <p>Digital tools and platforms are essential for modern supply chain management, providing visibility, automation, and data-driven insights.</p>
          
          <h2>Supplier Relationship Management</h2>
          <p>Building strong relationships with reliable suppliers and diversifying the supplier base are crucial for resilient supply chains.</p>
          
          <h2>Inventory Optimization</h2>
          <p>Advanced analytics help optimize inventory levels, reducing carrying costs while ensuring product availability.</p>
          
          <h2>Risk Management</h2>
          <p>Implementing comprehensive risk management strategies helps businesses prepare for and respond to supply chain disruptions.</p>
        `,
        featured_image: '/images/3.jpg',
        category: 'Supply Chain',
        tags: 'Supply Chain, Optimization, Management, Digital Transformation',
        author_id: adminId,
        status: 'published',
        meta_title: 'Supply Chain Optimization 2024 | Management Strategies',
        meta_description: 'Learn the best practices for optimizing supply chain management in 2024 with digital transformation strategies.',
        published_at: new Date('2024-11-25'),
        views: 756,
        createdAt: new Date('2024-11-25'),
        updatedAt: new Date('2024-11-25')
      },
      {
        title: 'Real-Time Fleet Tracking: Benefits and Implementation',
        slug: 'real-time-fleet-tracking-benefits-implementation',
        excerpt: 'Discover how real-time fleet tracking systems improve efficiency, reduce costs, and enhance customer service.',
        content: `
          <h2>What is Real-Time Fleet Tracking?</h2>
          <p>Real-time fleet tracking uses GPS technology and IoT sensors to monitor vehicle location, performance, and driver behavior in real-time.</p>
          
          <h2>Key Benefits</h2>
          <ul>
            <li>Improved route efficiency and reduced fuel costs</li>
            <li>Enhanced customer service with accurate delivery updates</li>
            <li>Better driver safety and behavior monitoring</li>
            <li>Reduced vehicle theft and unauthorized use</li>
            <li>Predictive maintenance capabilities</li>
          </ul>
          
          <h2>Implementation Considerations</h2>
          <p>Successful implementation requires careful planning, choosing the right technology partner, and ensuring proper driver training.</p>
          
          <h2>ROI and Cost Savings</h2>
          <p>Most businesses see significant ROI within 6-12 months through fuel savings, improved productivity, and reduced maintenance costs.</p>
        `,
        featured_image: '/images/4.jpg',
        category: 'Fleet Management',
        tags: 'Fleet Tracking, GPS, IoT, Fleet Management, Technology',
        author_id: adminId,
        status: 'published',
        meta_title: 'Real-Time Fleet Tracking Benefits | GPS Fleet Management',
        meta_description: 'Learn about real-time fleet tracking benefits and implementation strategies for better fleet management.',
        published_at: new Date('2024-11-22'),
        views: 1100,
        createdAt: new Date('2024-11-22'),
        updatedAt: new Date('2024-11-22')
      },
      {
        title: 'Digital Transformation in Transportation: A Complete Guide',
        slug: 'digital-transformation-transportation-complete-guide',
        excerpt: 'A comprehensive guide to implementing digital transformation strategies in the transportation industry.',
        content: `
          <h2>Understanding Digital Transformation</h2>
          <p>Digital transformation in transportation involves integrating digital technologies into all areas of business operations, fundamentally changing how companies operate and deliver value to customers.</p>
          
          <h2>Key Technologies</h2>
          <h3>Cloud Computing</h3>
          <p>Cloud-based solutions provide scalability, flexibility, and cost-effectiveness for transportation management systems.</p>
          
          <h3>Mobile Applications</h3>
          <p>Mobile apps improve communication between drivers, dispatchers, and customers while providing real-time updates.</p>
          
          <h3>Analytics and Big Data</h3>
          <p>Data analytics help identify trends, optimize operations, and make informed business decisions.</p>
          
          <h2>Implementation Strategy</h2>
          <p>Successful digital transformation requires a clear strategy, leadership commitment, and gradual implementation with proper change management.</p>
        `,
        featured_image: '/images/1.jpg',
        category: 'Digital Transformation',
        tags: 'Digital Transformation, Technology, Cloud Computing, Analytics',
        author_id: adminId,
        status: 'draft',
        meta_title: 'Digital Transformation in Transportation | Complete Guide',
        meta_description: 'Complete guide to digital transformation in transportation with strategies and best practices.',
        published_at: null,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};