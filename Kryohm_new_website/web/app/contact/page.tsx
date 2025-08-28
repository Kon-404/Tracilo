"use client";
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/form/ContactForm';

// Contact methods
const contactMethods = [
  {
    type: 'Sales Inquiries',
    description: 'Connect with our sales team for product information and quotes',
    phone: '+27 21 XXX XXXX',
    email: 'sales@kryohm.com',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM SAST',
    icon: '💼',
    specialty: 'New business opportunities and solution consulting'
  },
  {
    type: 'Technical Support',
    description: '24/7 technical assistance for existing customers',
    phone: '+27 21 XXX XXXX',
    email: 'support@kryohm.com',
    hours: '24/7 Emergency Support Available',
    icon: '🔧',
    specialty: 'System maintenance, troubleshooting, and optimization'
  },
  {
    type: 'General Inquiries',
    description: 'Questions about company, partnerships, and general information',
    phone: '+27 21 XXX XXXX',
    email: 'info@kryohm.com',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM SAST',
    icon: '📞',
    specialty: 'Company information, partnerships, and media inquiries'
  }
];

// Regional offices
const regionalOffices = [
  {
    country: 'South Africa',
    city: 'Cape Town',
    address: '123 Innovation Drive, Century City, Cape Town 7441',
    phone: '+27 21 XXX XXXX',
    email: 'capetown@kryohm.com',
    isHeadquarters: true,
    services: ['Sales', 'Technical Support', 'Training', 'Installation'],
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM SAST'
  },
  {
    country: 'South Africa',
    city: 'Johannesburg',
    address: '456 Technology Park, Sandton, Johannesburg 2196',
    phone: '+27 11 XXX XXXX',
    email: 'johannesburg@kryohm.com',
    isHeadquarters: false,
    services: ['Sales', 'Technical Support', 'Installation'],
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM SAST'
  },
  {
    country: 'Namibia',
    city: 'Windhoek',
    address: '789 Industrial Avenue, Windhoek 10001',
    phone: '+264 61 XXX XXX',
    email: 'windhoek@kryohm.com',
    isHeadquarters: false,
    services: ['Sales', 'Technical Support'],
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM WAT'
  },
  {
    country: 'Zambia',
    city: 'Lusaka',
    address: '321 Business District, Lusaka 10101',
    phone: '+260 21 XXX XXXX',
    email: 'lusaka@kryohm.com',
    isHeadquarters: false,
    services: ['Sales', 'Technical Support'],
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM CAT'
  }
];

// Support levels
const supportLevels = [
  {
    level: 'Standard Support',
    description: 'Business hours support for routine inquiries and maintenance',
    responseTime: '4-8 hours',
    availability: 'Mon-Fri, 8:00 AM - 6:00 PM',
    channels: ['Email', 'Phone', 'Online Portal'],
    included: ['Technical guidance', 'Software updates', 'Documentation access'],
    icon: '📋'
  },
  {
    level: 'Priority Support',
    description: 'Extended hours support with faster response times',
    responseTime: '2-4 hours',
    availability: 'Mon-Fri, 7:00 AM - 8:00 PM',
    channels: ['Email', 'Phone', 'Online Portal', 'Remote Access'],
    included: ['Priority handling', 'Escalation management', 'Performance monitoring'],
    icon: '⚡'
  },
  {
    level: 'Critical Support',
    description: '24/7 emergency support for mission-critical systems',
    responseTime: '< 1 hour',
    availability: '24/7/365',
    channels: ['Emergency Hotline', 'SMS Alerts', 'Remote Access', 'On-site Support'],
    included: ['Immediate response', 'Emergency technician dispatch', 'System recovery'],
    icon: '🚨'
  }
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  
  const getFormType = (): 'contact' | 'demo' | 'pricing' => {
    if (type === 'demo') return 'demo';
    if (type === 'pricing') return 'pricing';
    return 'contact';
  };

  const getPageTitle = () => {
    switch (getFormType()) {
      case 'demo': return 'Request a Demo';
      case 'pricing': return 'Request Pricing';
      default: return 'Contact Us';
    }
  };

  const getPageDescription = () => {
    switch (getFormType()) {
      case 'demo': return 'Experience our IoT solutions firsthand with a personalized demonstration.';
      case 'pricing': return 'Get customized pricing for your IoT solution requirements.';
      default: return 'Get in touch with our team for support, sales, or general inquiries.';
    }
  };

  return (
    <>
      <Section spacing="sm" variant="secondary">
        <Container>
          <Breadcrumb />
        </Container>
      </Section>
      
      {/* Hero Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
              {getPageTitle()}
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              {getPageDescription()}
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact?type=demo">Book a Demo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact?type=pricing">Request Pricing</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="tel:+2782XXXXXXX">Emergency Support</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section spacing="lg" variant="secondary">
        <Container size="md">
          <ContactForm formType={getFormType()} />
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Choose the contact method that works best for your needs. Our specialized teams 
              are ready to assist with sales, support, and general inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} variant="elevated" className="text-center h-full">
                <CardHeader>
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <CardTitle>{method.type}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-body-sm font-semibold text-[--color-neutral-800] mb-1">
                        📞 {method.phone}
                      </div>
                      <div className="text-body-sm text-[--color-neutral-600] mb-3">
                        ✉️ {method.email}
                      </div>
                      <div className="text-body-xs text-[--color-neutral-500]">
                        {method.hours}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[--color-neutral-200]">
                      <p className="text-body-xs text-[--color-neutral-600]">
                        {method.specialty}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Regional Offices */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Our Office Locations
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              With offices across three countries, we provide local support and expertise 
              throughout the region. Visit us or contact your nearest office.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regionalOffices.map((office, index) => (
              <Card key={index} variant="outlined" className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">🏢</div>
                    <CardTitle className="flex items-center gap-2">
                      {office.city}, {office.country}
                      {office.isHeadquarters && (
                        <span className="text-body-xs px-2 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-full">
                          Headquarters
                        </span>
                      )}
                    </CardTitle>
                  </div>
                  <CardDescription>{office.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-body-sm text-[--color-neutral-700] mb-1">
                        📞 {office.phone}
                      </div>
                      <div className="text-body-sm text-[--color-neutral-700] mb-1">
                        ✉️ {office.email}
                      </div>
                      <div className="text-body-sm text-[--color-neutral-600]">
                        🕒 {office.hours}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Available Services
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service, idx) => (
                          <span 
                            key={idx}
                            className="text-body-xs px-2 py-1 bg-[--color-neutral-100] text-[--color-neutral-600] rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Support Levels */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Technical Support Options
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Choose the support level that matches your business requirements. From standard 
              business hours support to 24/7 emergency response, we have you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {supportLevels.map((support, index) => (
              <Card key={index} variant="elevated" className="h-full">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{support.icon}</div>
                  <CardTitle>{support.level}</CardTitle>
                  <CardDescription>{support.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-[--color-brand-primary-50] rounded-lg">
                      <div className="text-heading-sm font-bold text-[--color-brand-primary-700]">
                        {support.responseTime}
                      </div>
                      <div className="text-body-xs text-[--color-neutral-600]">
                        Response Time
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Availability
                      </h4>
                      <p className="text-body-sm text-[--color-neutral-600]">
                        {support.availability}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Support Channels
                      </h4>
                      <div className="space-y-1">
                        {support.channels.map((channel, idx) => (
                          <div key={idx} className="text-body-sm text-[--color-neutral-600] flex items-center">
                            <span className="text-[--color-brand-primary] mr-2">•</span>
                            {channel}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Included Services
                      </h4>
                      <div className="space-y-1">
                        {support.included.map((service, idx) => (
                          <div key={idx} className="text-body-sm text-[--color-neutral-600] flex items-center">
                            <span className="text-[--color-brand-primary] mr-2">✓</span>
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Emergency Contact */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <Card variant="elevated" className="text-center bg-[--color-state-error-50] border-[--color-state-error-200]">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-heading-lg font-bold text-[--color-neutral-900] mb-4">
                Emergency Technical Support
              </h3>
              <p className="text-body-lg text-[--color-neutral-600] mb-6 max-w-2xl mx-auto">
                For critical system failures or urgent technical issues affecting your operations, 
                contact our emergency support line for immediate assistance.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="text-heading-md font-bold text-[--color-state-error-700]">
                    +27 82 XXX XXXX
                  </div>
                  <div className="text-body-sm text-[--color-neutral-600]">
                    24/7 Emergency Hotline
                  </div>
                </div>
                
                <div className="text-body-sm text-[--color-neutral-600]">
                  Average response time: &lt; 15 minutes
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* FAQ Quick Links */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Need Quick Answers?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Check our knowledge base and resources for immediate answers to common questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="outlined" className="text-center hover:shadow-medium transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                  Documentation
                </h3>
                <p className="text-body-sm text-[--color-neutral-600] mb-4">
                  Technical guides and API references
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/docs">View Docs</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card variant="outlined" className="text-center hover:shadow-medium transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">❓</div>
                <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                  FAQ
                </h3>
                <p className="text-body-sm text-[--color-neutral-600] mb-4">
                  Frequently asked questions
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/faq">Read FAQ</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card variant="outlined" className="text-center hover:shadow-medium transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🎥</div>
                <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                  Video Tutorials
                </h3>
                <p className="text-body-sm text-[--color-neutral-600] mb-4">
                  Step-by-step setup guides
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tutorials">Watch Videos</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card variant="outlined" className="text-center hover:shadow-medium transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-2">
                  Training
                </h3>
                <p className="text-body-sm text-[--color-neutral-600] mb-4">
                  Certification and training programs
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/training">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}