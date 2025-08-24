import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import type { Metadata } from 'next'

// Team members data
const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    position: 'Chief Executive Officer',
    background: 'PhD in Electrical Engineering, 15+ years in IoT industry leadership',
    expertise: ['Strategic Planning', 'Business Development', 'Technology Vision'],
    experience: 'Former VP of Engineering at leading IoT platform company, published researcher in smart systems',
    image: '👩‍💼'
  },
  {
    name: 'Mark Thompson',
    position: 'Chief Technology Officer',
    background: 'MSc Computer Science, 12+ years in IoT architecture and platform development',
    expertise: ['IoT Architecture', 'Cloud Platforms', 'Security Systems'],
    experience: 'Led development teams at major tech companies, specialist in scalable IoT solutions',
    image: '👨‍💻'
  },
  {
    name: 'Elena Rodriguez',
    position: 'VP of Sales & Marketing',
    background: 'MBA Marketing, 10+ years in B2B technology sales and market development',
    expertise: ['Market Strategy', 'Client Relations', 'Solution Consulting'],
    experience: 'Built sales teams and market presence across Africa for technology solutions',
    image: '👩‍💼'
  },
  {
    name: 'David Chen',
    position: 'Lead Software Engineer',
    background: 'BSc Software Engineering, 8+ years in full-stack development and IoT platforms',
    expertise: ['Full-Stack Development', 'API Design', 'System Integration'],
    experience: 'Senior developer with expertise in React, Node.js, and IoT device integration',
    image: '👨‍💻'
  }
]

// Company milestones
const milestones = [
  {
    year: '2019',
    title: 'Company Founded',
    description: 'Kryohm established with vision to transform energy management through IoT innovation'
  },
  {
    year: '2020',
    title: 'First Product Launch',
    description: 'Launched IoT sensor platform for agricultural monitoring with initial customer deployments'
  },
  {
    year: '2021',
    title: 'Platform Expansion',
    description: 'Added prepaid metering solutions and expanded to utility sector partnerships'
  },
  {
    year: '2022',
    title: 'Regional Growth',
    description: 'Expanded operations to Namibia and Zambia, established regional support centers'
  },
  {
    year: '2023',
    title: 'Innovation Recognition',
    description: 'Awarded "IoT Innovation of the Year" by African Technology Association'
  },
  {
    year: '2024',
    title: 'Platform Integration',
    description: 'Launched unified platform connecting all product lines with advanced analytics'
  }
]

// Service areas
const serviceAreas = [
  {
    country: 'South Africa',
    cities: ['Cape Town', 'Johannesburg', 'Durban', 'Port Elizabeth'],
    phone: '+27 21 XXX XXXX',
    email: 'south-africa@kryohm.com'
  },
  {
    country: 'Namibia',
    cities: ['Windhoek', 'Walvis Bay', 'Swakopmund'],
    phone: '+264 61 XXX XXX',
    email: 'namibia@kryohm.com'
  },
  {
    country: 'Zambia',
    cities: ['Lusaka', 'Kitwe', 'Ndola'],
    phone: '+260 21 XXX XXXX',
    email: 'zambia@kryohm.com'
  }
]

// Business credentials
const credentials = [
  {
    category: 'Certifications',
    items: ['ISO 27001 Information Security', 'ISO 9001 Quality Management', 'IEC 62443 Industrial Security']
  },
  {
    category: 'Industry Memberships',
    items: ['African IoT Alliance', 'Smart Cities Council', 'International Energy Association']
  },
  {
    category: 'Technology Partners',
    items: ['Microsoft Azure IoT', 'AWS IoT Core', 'Google Cloud IoT', 'Arm Mbed Partners']
  },
  {
    category: 'Business Licenses',
    items: ['Telecommunications Equipment License', 'Energy Services Provider', 'Software Development License']
  }
]

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <Section spacing="sm" variant="secondary">
        <Container>
          <Breadcrumb />
        </Container>
      </Section>
      
      {/* Hero Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-heading-xl font-bold text-[--color-neutral-900] mb-6">
              Transforming Operations Through IoT Innovation
            </h1>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Kryohm empowers businesses across Africa with intelligent IoT solutions that optimize operations, 
              reduce costs, and drive sustainable growth. We combine cutting-edge technology with local expertise 
              to deliver transformational results for our clients.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Meet Our Team
              </Button>
              <Button variant="secondary" size="lg">
                Discuss Your Project
              </Button>
              <Button variant="ghost" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                    Mission
                  </h3>
                  <p className="text-body-md text-[--color-neutral-600]">
                    To democratize access to intelligent IoT solutions across Africa, enabling businesses 
                    of all sizes to optimize their operations, reduce costs, and achieve sustainable growth 
                    through data-driven insights and automation.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                    Vision
                  </h3>
                  <p className="text-body-md text-[--color-neutral-600]">
                    To be Africa's leading IoT solutions provider, recognized for innovation, reliability, 
                    and customer success in transforming traditional operations into smart, efficient, 
                    and profitable enterprises.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">500+</div>
                <div className="text-body-sm text-[--color-neutral-600]">Successful Deployments</div>
              </div>
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">3</div>
                <div className="text-body-sm text-[--color-neutral-600]">Countries Served</div>
              </div>
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">98%</div>
                <div className="text-body-sm text-[--color-neutral-600]">Customer Satisfaction</div>
              </div>
              <div className="text-center p-6 bg-[--color-brand-primary-50] rounded-lg">
                <div className="text-heading-lg font-bold text-[--color-brand-primary-700] mb-2">24/7</div>
                <div className="text-body-sm text-[--color-neutral-600]">Technical Support</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership Team */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Leadership Team
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our experienced leadership team combines deep technical expertise with proven business 
              acumen to guide Kryohm's vision and ensure customer success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} variant="elevated">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-[--color-brand-primary-700] font-medium">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-body-sm text-[--color-neutral-600]">
                      {member.background}
                    </p>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Core Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="text-body-xs px-3 py-1 bg-[--color-brand-primary-50] text-[--color-brand-primary-700] rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Experience
                      </h4>
                      <p className="text-body-sm text-[--color-neutral-600]">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Company History & Milestones */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Our Journey
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              From startup vision to regional IoT leader, discover how Kryohm has grown to serve 
              hundreds of clients across Africa with innovative technology solutions.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[--color-brand-primary] h-full hidden md:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <Card variant="elevated">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="bg-[--color-brand-primary] text-white px-3 py-1 rounded-full text-body-sm font-bold">
                            {milestone.year}
                          </div>
                          <h3 className="text-heading-sm font-semibold text-[--color-neutral-900]">
                            {milestone.title}
                          </h3>
                        </div>
                        <p className="text-body-sm text-[--color-neutral-600]">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:block w-4 h-4 bg-[--color-brand-primary] rounded-full border-4 border-white shadow-md z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Service Areas */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Regional Coverage
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              We serve clients across three key African markets with local expertise, 
              regional support centers, and dedicated customer service teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <Card key={index} variant="outlined" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">🌍</div>
                  <CardTitle>{area.country}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-heading-xs font-semibold text-[--color-neutral-800] mb-2">
                        Service Cities
                      </h4>
                      <div className="space-y-1">
                        {area.cities.map((city, idx) => (
                          <div key={idx} className="text-body-sm text-[--color-neutral-600]">
                            {city}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[--color-neutral-200]">
                      <div className="text-body-sm text-[--color-neutral-600] mb-2">
                        📞 {area.phone}
                      </div>
                      <div className="text-body-sm text-[--color-neutral-600]">
                        ✉️ {area.email}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Business Credentials */}
      <Section spacing="lg" variant="secondary">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Credentials & Partnerships
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              Our commitment to quality, security, and excellence is demonstrated through industry 
              certifications, strategic partnerships, and professional memberships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.map((credential, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle>{credential.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {credential.items.map((item, idx) => (
                      <li key={idx} className="text-body-sm text-[--color-neutral-600] flex items-start">
                        <span className="text-[--color-brand-primary] mr-2 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values & Approach */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Our Values & Approach
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] max-w-3xl mx-auto">
              We believe in building lasting partnerships through innovation, transparency, 
              and unwavering commitment to customer success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Innovation First
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Continuously advancing IoT technology to solve real business challenges with creative solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Partnership Focus
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Building long-term relationships based on trust, transparency, and mutual success.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Results Driven
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Focused on delivering measurable ROI and tangible business improvements for every client.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-heading-sm font-semibold text-[--color-neutral-900] mb-3">
                Local Expertise
              </h3>
              <p className="text-body-sm text-[--color-neutral-600]">
                Deep understanding of African markets with solutions tailored to regional needs and challenges.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading-lg font-bold text-[--color-neutral-900] mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-body-lg text-[--color-neutral-600] mb-8">
              Join hundreds of businesses across Africa who trust Kryohm to deliver innovative IoT solutions 
              that drive real results. Let's discuss how we can help transform your operations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                Meet Our Team
              </Button>
              <Button variant="secondary" size="lg">
                Discuss Your Project
              </Button>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'About Kryohm - IoT Solutions Leadership & Innovation',
  description: 'Meet the Kryohm team transforming operations across Africa with innovative IoT solutions. Learn about our mission, leadership, and commitment to customer success.',
  keywords: 'Kryohm team, IoT company, African technology, business leadership, innovation, customer success, regional coverage',
  openGraph: {
    title: 'About Kryohm - IoT Solutions Leadership & Innovation',
    description: 'Meet the team transforming operations across Africa with innovative IoT solutions and local expertise.',
    type: 'website',
  },
}