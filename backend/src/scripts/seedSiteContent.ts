import { query } from "../config/database";

/**
 * Seed script for site content management
 * Populates existing site pages with CMS-manageable content
 */

async function seedSiteContent() {
  console.log("🌱 Starting Site Content seed process...");

  try {
    // Get site pages
    const pagesResult = await query("SELECT * FROM site_pages");
    const pages = pagesResult.rows;

    if (pages.length === 0) {
      console.log("❌ No site pages found. Please run migration first.");
      return;
    }

    console.log(`📄 Found ${pages.length} site pages to populate`);

    // Clear existing content
    await query("DELETE FROM site_page_content");
    console.log("🗑️ Cleared existing site content");

    // Content for each page
    const pageContents: { [key: string]: any[] } = {
      '/blog': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'R/E BLOGS',
            subtitle: 'Stay informed with the latest real estate market trends, data, and analysis.',
            background_image: '/images/Real Estate.png',
            cta_text: 'GET STARTED',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Access educational resources for agents, investors, and property owners.',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Blog Categories',
            features: [
              {
                icon: '📈',
                title: 'Market Updates',
                description: 'Stay informed with the latest real estate market trends, data, and analysis.'
              },
              {
                icon: '💡',
                title: 'Investment Education',
                description: 'Learn strategies and best practices for real estate investment success.'
              },
              {
                icon: '📋',
                title: 'Regulatory Topics',
                description: 'Understand compliance requirements, legal updates, and industry regulations.'
              },
              {
                icon: '📚',
                title: 'General Real Estate Knowledge',
                description: 'Access educational resources for agents, investors, and property owners.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'REAL ESTATE SERVICES',
            subtitle: 'Comprehensive real estate solutions and services for agents and investors.',
            background_image: '/images/Real Estate.png',
            cta_text: 'EXPLORE SERVICES',
            cta_url: '/real-estate/agent-commission'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'DrivePixel offers comprehensive real estate services designed to help agents, brokers, and investors succeed in today\'s competitive market.',
            style: 'normal'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Our Real Estate Solutions',
            features: [
              {
                icon: '🏢',
                title: 'Agent Commission Programs',
                description: '100% commission plans with full support and resources.'
              },
              {
                icon: '📊',
                title: 'Market Analysis',
                description: 'Comprehensive market data and investment analysis.'
              },
              {
                icon: '🤝',
                title: 'Broker Support',
                description: 'Professional guidance and mentorship for success.'
              },
              {
                icon: '💰',
                title: 'Investment Opportunities',
                description: 'Access to exclusive real estate investment deals.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/agent-commission': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'AGENT 100% COMMISSION',
            subtitle: 'Keep more of your hard-earned money with our revolutionary commission structure.',
            background_image: '/images/Real Estate.png',
            cta_text: 'JOIN NOW',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Why settle for less when you can keep 100% of your commission?',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Commission Benefits',
            features: [
              {
                icon: '💰',
                title: '100% Commission',
                description: 'Keep all your hard-earned commission.'
              },
              {
                icon: '🏢',
                title: 'Full Sponsorship',
                description: 'Complete broker support and sponsorship.'
              },
              {
                icon: '📈',
                title: 'Referral Fees',
                description: 'Earn additional income through referrals.'
              },
              {
                icon: '🎓',
                title: 'Training & Support',
                description: 'Continuous education and mentorship.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/why-onedrive': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'WHY ONEDRIVE REALTY',
            subtitle: 'Discover the advantages of partnering with OneDrive Realty for your real estate career.',
            background_image: '/images/Real Estate.png',
            cta_text: 'LEARN MORE',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Experience the difference with OneDrive Realty',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Why Choose OneDrive',
            features: [
              {
                icon: '🏆',
                title: 'Industry Leadership',
                description: 'Leading real estate brokerage with proven success.'
              },
              {
                icon: '🤝',
                title: 'Agent Support',
                description: 'Comprehensive support for agent success.'
              },
              {
                icon: '📊',
                title: 'Advanced Technology',
                description: 'Cutting-edge tools and platforms.'
              },
              {
                icon: '🌟',
                title: 'Reputation',
                description: 'Trusted name in real estate.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/build-dream-home': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'BUILD YOUR DREAM HOME',
            subtitle: 'Turn your vision into reality with our comprehensive home building services.',
            background_image: '/images/Real Estate.png',
            cta_text: 'START BUILDING',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Create the perfect home tailored to your dreams',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Building Services',
            features: [
              {
                icon: '🏗️',
                title: 'Custom Design',
                description: 'Personalized home designs to match your vision.'
              },
              {
                icon: '🔨',
                title: 'Quality Construction',
                description: 'Premium materials and expert craftsmanship.'
              },
              {
                icon: '📐',
                title: 'Project Management',
                description: 'Complete oversight from start to finish.'
              },
              {
                icon: '💎',
                title: 'Luxury Finishes',
                description: 'High-end materials and sophisticated details.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/list-property': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'LIST YOUR PROPERTY',
            subtitle: 'Maximum exposure and expert marketing to sell your property quickly and for the best price.',
            background_image: '/images/Real Estate.png',
            cta_text: 'LIST NOW',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Sell your property with confidence and expertise',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Listing Services',
            features: [
              {
                icon: '📸',
                title: 'Professional Photography',
                description: 'High-quality images to showcase your property.'
              },
              {
                icon: '🎯',
                title: 'Targeted Marketing',
                description: 'Strategic marketing to reach qualified buyers.'
              },
              {
                icon: '💰',
                title: 'Pricing Strategy',
                description: 'Expert pricing to maximize your return.'
              },
              {
                icon: '🤝',
                title: 'Negotiation Support',
                description: 'Expert negotiation to secure the best deal.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/api-leads': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'API LEADS GENERATION',
            subtitle: 'Advanced lead generation system to connect you with qualified real estate prospects.',
            background_image: '/images/Real Estate.png',
            cta_text: 'GET LEADS',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Transform your business with quality leads',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Lead Generation Features',
            features: [
              {
                icon: '🎯',
                title: 'Targeted Leads',
                description: 'Qualified prospects matched to your criteria.'
              },
              {
                icon: '📊',
                title: 'Real-time Data',
                description: 'Live lead updates and notifications.'
              },
              {
                icon: '🔄',
                title: 'Automated Follow-up',
                description: 'Systematic lead nurturing process.'
              },
              {
                icon: '📈',
                title: 'Conversion Tracking',
                description: 'Monitor lead performance and ROI.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/exchange-1031': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: '1031 EXCHANGE',
            subtitle: 'Tax-deferred property exchange strategies to maximize your investment potential.',
            background_image: '/images/Real Estate.png',
            cta_text: 'LEARN MORE',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Smart tax strategies for real estate investors',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Exchange Benefits',
            features: [
              {
                icon: '💰',
                title: 'Tax Deferral',
                description: 'Defer capital gains taxes on property exchanges.'
              },
              {
                icon: '📈',
                title: 'Investment Growth',
                description: 'Reinvest proceeds into larger properties.'
              },
              {
                icon: '🏢',
                title: 'Portfolio Diversification',
                description: 'Expand and diversify your real estate portfolio.'
              },
              {
                icon: '⚖️',
                title: 'Legal Compliance',
                description: 'Ensure compliance with IRS regulations.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/halal-financing': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'HALAL FINANCING',
            subtitle: 'Sharia-compliant real estate financing solutions for Muslim investors and homebuyers.',
            background_image: '/images/Real Estate.png',
            cta_text: 'APPLY NOW',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Ethical financing for your real estate needs',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Halal Financing Features',
            features: [
              {
                icon: '☪️',
                title: 'Sharia Compliant',
                description: 'Fully compliant with Islamic finance principles.'
              },
              {
                icon: '🏠',
                title: 'Home Financing',
                description: 'Halal mortgages and home purchase plans.'
              },
              {
                icon: '💼',
                title: 'Investment Properties',
                description: 'Financing for halal real estate investments.'
              },
              {
                icon: '🤝',
                title: 'Expert Guidance',
                description: 'Specialized advisors for Islamic finance.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/real-estate/cap-ror-reo': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'CAP RATE & REO',
            subtitle: 'Expert analysis and opportunities in capitalization rates and REO properties.',
            background_image: '/images/Real Estate.png',
            cta_text: 'EXPLORE OPPORTUNITIES',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Maximize returns with strategic property analysis',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Investment Analysis',
            features: [
              {
                icon: '📊',
                title: 'Cap Rate Analysis',
                description: 'Detailed capitalization rate calculations.'
              },
              {
                icon: '🏢',
                title: 'REO Properties',
                description: 'Access to bank-owned real estate opportunities.'
              },
              {
                icon: '💰',
                title: 'ROI Optimization',
                description: 'Strategies to maximize investment returns.'
              },
              {
                icon: '📈',
                title: 'Market Trends',
                description: 'Analysis of market conditions and forecasts.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ],
      '/services': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'OUR SERVICES',
            subtitle: 'Professional services and solutions tailored to your needs.',
            background_image: '/images/Services.jpg',
            cta_text: 'GET STARTED',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Our Services',
            features: [
              {
                icon: '💻',
                title: 'Web Development',
                description: 'Custom websites, responsive layouts, and e-commerce solutions.'
              },
              {
                icon: '📱',
                title: 'Mobile App Development',
                description: 'iOS & Android apps with seamless UX.'
              },
              {
                icon: '⚙️',
                title: 'Custom Software Solutions',
                description: 'Business management and automation applications.'
              },
              {
                icon: '🎧',
                title: 'IT Consulting',
                description: 'Strategy, implementation, and ongoing support.'
              },
              {
                icon: '🔒',
                title: 'Cybersecurity',
                description: 'Protect your network and sensitive data.'
              },
              {
                icon: '🏠',
                title: 'Real Estate IT Solutions',
                description: 'Specialized solutions for real estate businesses.'
              }
            ]
          },
          section_order: 1,
          block_order: 0
        }
      ],
      '/logistics': [
        {
          section_name: 'hero',
          block_type: 'hero',
          content: {
            title: 'FREIGHT & LOGISTICS',
            subtitle: 'Reliable freight and logistics solutions for your business needs.',
            background_image: '/images/logistics-bg.jpg',
            cta_text: 'CONTACT US',
            cta_url: '/contact'
          },
          section_order: 0,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'text',
          content: {
            text: 'Streamline your supply chain with our comprehensive freight and logistics services.',
            style: 'heading'
          },
          section_order: 1,
          block_order: 0
        },
        {
          section_name: 'main',
          block_type: 'features',
          content: {
            title: 'Logistics Services',
            features: [
              {
                icon: '🚚',
                title: 'Freight Transportation',
                description: 'Reliable and efficient freight shipping solutions.'
              },
              {
                icon: '📦',
                title: 'Warehousing',
                description: 'Secure storage and inventory management.'
              },
              {
                icon: '🚢',
                title: 'International Shipping',
                description: 'Global logistics and customs clearance.'
              },
              {
                icon: '📈',
                title: 'Supply Chain Management',
                description: 'End-to-end supply chain optimization.'
              }
            ]
          },
          section_order: 1,
          block_order: 1
        }
      ]
    };

    // Insert content for each page
    for (const page of pages) {
      const contentBlocks = pageContents[page.path];
      
      if (contentBlocks) {
        console.log(`📝 Adding content to ${page.title} (${page.path})`);
        
        for (const block of contentBlocks) {
          await query(`
            INSERT INTO site_page_content 
            (page_id, section_name, block_type, content, section_order, block_order, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
          `, [
            page.id,
            block.section_name,
            block.block_type,
            JSON.stringify(block.content),
            block.section_order,
            block.block_order,
            true
          ]);
        }
      } else {
        console.log(`⚠️ No content template found for ${page.path}`);
      }
    }

    console.log("\n✅ Site Content seeding completed successfully!");
    console.log("\n📊 Summary:");
    pages.forEach(page => {
      const blockCount = pageContents[page.path]?.length || 0;
      console.log(`   📄 ${page.title}: ${blockCount} content blocks`);
    });

  } catch (error) {
    console.error("❌ Error seeding site content:", error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedSiteContent()
    .then(() => {
      console.log("✅ Site content seed completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Site content seed failed:", error);
      process.exit(1);
    });
}

export default seedSiteContent;
