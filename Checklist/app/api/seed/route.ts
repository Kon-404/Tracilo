/**
 * Database seed endpoint
 *
 * Call this endpoint once to seed the database with system templates
 * For security, this should be protected or removed after initial setup
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Database Seed</title>
        <style>
          body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
          button { background: #0070f3; color: white; border: none; padding: 12px 24px;
                   border-radius: 6px; cursor: pointer; font-size: 16px; }
          button:hover { background: #0051cc; }
          .result { margin-top: 20px; padding: 12px; border-radius: 6px; }
          .success { background: #d4edda; color: #155724; }
          .error { background: #f8d7da; color: #721c24; }
        </style>
      </head>
      <body>
        <h1>Database Seed</h1>
        <p>Click the button below to seed the database with system templates (Vehicle, Solar, Gas).</p>
        <button onclick="seedDatabase()">Seed Database</button>
        <div id="result"></div>

        <script>
          async function seedDatabase() {
            const result = document.getElementById('result');
            result.innerHTML = 'Seeding database...';
            result.className = 'result';

            try {
              const response = await fetch('/api/seed', { method: 'POST' });
              const data = await response.json();

              if (data.success) {
                result.innerHTML = '<strong>Success!</strong><br>' + data.message +
                  '<br><br>Templates created:<ul>' +
                  data.templates.map(t => '<li>' + t.name + '</li>').join('') +
                  '</ul>';
                result.className = 'result success';
              } else {
                result.innerHTML = '<strong>Error:</strong> ' + data.error;
                result.className = 'result error';
              }
            } catch (error) {
              result.innerHTML = '<strong>Error:</strong> ' + error.message;
              result.className = 'result error';
            }
          }
        </script>
      </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication check here
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    console.log('Starting database seed...');

    // Vehicle Inspection Template
    const vehicleTemplate = await prisma.formTemplate.create({
      data: {
        id: 'tpl_vehicle_001',
        name: 'Vehicle Inspection',
        description: 'Comprehensive vehicle safety and compliance inspection checklist',
        category: 'vehicle',
        organizationId: null,
        createdBy: null,
        sections: {
          create: [
            {
              id: 'sec_vehicle_exterior',
              title: 'Exterior Inspection',
              description: 'Visual inspection of vehicle exterior',
              order: 0,
              fields: {
                create: [
                  {
                    id: 'field_vehicle_license',
                    type: 'text',
                    label: 'License Plate Number',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_make',
                    type: 'text',
                    label: 'Vehicle Make',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_model',
                    type: 'text',
                    label: 'Vehicle Model',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_year',
                    type: 'number',
                    label: 'Year',
                    order: 3,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_body',
                    type: 'dropdown',
                    label: 'Body Condition',
                    order: 4,
                    required: true,
                    config: {
                      options: ['Excellent', 'Good', 'Fair', 'Poor'],
                    },
                  },
                  {
                    id: 'field_vehicle_paint',
                    type: 'dropdown',
                    label: 'Paint Condition',
                    order: 5,
                    required: true,
                    config: {
                      options: ['Excellent', 'Good', 'Fair', 'Poor'],
                    },
                  },
                ],
              },
            },
            {
              id: 'sec_vehicle_tires',
              title: 'Tires & Wheels',
              description: 'Tire and wheel inspection',
              order: 1,
              fields: {
                create: [
                  {
                    id: 'field_vehicle_tire_condition',
                    type: 'dropdown',
                    label: 'Overall Tire Condition',
                    order: 0,
                    required: true,
                    config: {
                      options: ['Excellent', 'Good', 'Fair', 'Poor'],
                    },
                  },
                  {
                    id: 'field_vehicle_tread',
                    type: 'number',
                    label: 'Tread Depth (mm)',
                    order: 1,
                    required: true,
                    config: {
                      min: 0,
                      max: 20,
                    },
                  },
                  {
                    id: 'field_vehicle_tire_photo',
                    type: 'photo',
                    label: 'Tire Photo',
                    order: 2,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_vehicle_safety',
              title: 'Safety Equipment',
              description: 'Check required safety equipment',
              order: 2,
              fields: {
                create: [
                  {
                    id: 'field_vehicle_lights',
                    type: 'checkbox',
                    label: 'All Lights Functioning',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_signals',
                    type: 'checkbox',
                    label: 'Turn Signals Working',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_brakes',
                    type: 'checkbox',
                    label: 'Brakes Functioning Properly',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_notes',
                    type: 'textarea',
                    label: 'Additional Notes',
                    order: 3,
                    required: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    // Solar Installation Template
    const solarTemplate = await prisma.formTemplate.create({
      data: {
        id: 'tpl_solar_001',
        name: 'Solar Installation',
        description: 'Solar panel installation compliance and quality checklist',
        category: 'solar',
        organizationId: null,
        createdBy: null,
        sections: {
          create: [
            {
              id: 'sec_solar_site',
              title: 'Site Information',
              description: 'Installation site details',
              order: 0,
              fields: {
                create: [
                  {
                    id: 'field_solar_address',
                    type: 'textarea',
                    label: 'Installation Address',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_date',
                    type: 'date',
                    label: 'Installation Date',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_installer',
                    type: 'text',
                    label: 'Installer Name',
                    order: 2,
                    required: true,
                  },
                ],
              },
            },
            {
              id: 'sec_solar_panels',
              title: 'Solar Panels',
              description: 'Panel installation details',
              order: 1,
              fields: {
                create: [
                  {
                    id: 'field_solar_panel_count',
                    type: 'number',
                    label: 'Number of Panels',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_panel_wattage',
                    type: 'number',
                    label: 'Panel Wattage (W)',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_total_capacity',
                    type: 'number',
                    label: 'Total System Capacity (kW)',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_solar_panel_photo',
                    type: 'photo',
                    label: 'Panel Installation Photo',
                    order: 3,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_solar_electrical',
              title: 'Electrical Connections',
              description: 'Electrical system checks',
              order: 2,
              fields: {
                create: [
                  {
                    id: 'field_solar_inverter',
                    type: 'text',
                    label: 'Inverter Model',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_voltage',
                    type: 'number',
                    label: 'System Voltage (V)',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_grounding',
                    type: 'checkbox',
                    label: 'Proper Grounding Verified',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_solar_electrical_photo',
                    type: 'photo',
                    label: 'Electrical Connection Photo',
                    order: 3,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_solar_compliance',
              title: 'Compliance & Testing',
              description: 'Final compliance checks',
              order: 3,
              fields: {
                create: [
                  {
                    id: 'field_solar_permits',
                    type: 'checkbox',
                    label: 'All Permits Obtained',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_standards',
                    type: 'checkbox',
                    label: 'Meets Local Standards',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_testing',
                    type: 'checkbox',
                    label: 'System Testing Complete',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_solar_notes',
                    type: 'textarea',
                    label: 'Additional Notes',
                    order: 3,
                    required: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    // Gas Installation Template
    const gasTemplate = await prisma.formTemplate.create({
      data: {
        id: 'tpl_gas_001',
        name: 'Gas Installation',
        description: 'Gas line installation and safety inspection checklist',
        category: 'gas',
        organizationId: null,
        createdBy: null,
        sections: {
          create: [
            {
              id: 'sec_gas_site',
              title: 'Site Information',
              description: 'Installation location details',
              order: 0,
              fields: {
                create: [
                  {
                    id: 'field_gas_address',
                    type: 'textarea',
                    label: 'Installation Address',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_gas_date',
                    type: 'date',
                    label: 'Installation Date',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_installer',
                    type: 'text',
                    label: 'Installer Name',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_gas_license',
                    type: 'text',
                    label: 'Installer License Number',
                    order: 3,
                    required: true,
                  },
                ],
              },
            },
            {
              id: 'sec_gas_installation',
              title: 'Installation Details',
              description: 'Gas line and appliance details',
              order: 1,
              fields: {
                create: [
                  {
                    id: 'field_gas_type',
                    type: 'dropdown',
                    label: 'Gas Type',
                    order: 0,
                    required: true,
                    config: {
                      options: ['Natural Gas', 'Propane', 'LPG'],
                    },
                  },
                  {
                    id: 'field_gas_pipe_size',
                    type: 'text',
                    label: 'Pipe Size',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_pipe_material',
                    type: 'dropdown',
                    label: 'Pipe Material',
                    order: 2,
                    required: true,
                    config: {
                      options: ['Steel', 'Copper', 'CSST', 'PE'],
                    },
                  },
                  {
                    id: 'field_gas_appliance',
                    type: 'text',
                    label: 'Appliance Connected',
                    order: 3,
                    required: true,
                  },
                ],
              },
            },
            {
              id: 'sec_gas_safety',
              title: 'Safety Checks',
              description: 'Required safety inspections',
              order: 2,
              fields: {
                create: [
                  {
                    id: 'field_gas_leak_test',
                    type: 'checkbox',
                    label: 'Leak Test Passed',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_gas_pressure',
                    type: 'number',
                    label: 'Operating Pressure (kPa)',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_ventilation',
                    type: 'checkbox',
                    label: 'Proper Ventilation Verified',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_gas_shutoff',
                    type: 'checkbox',
                    label: 'Shutoff Valve Accessible',
                    order: 3,
                    required: true,
                  },
                  {
                    id: 'field_gas_photo',
                    type: 'photo',
                    label: 'Installation Photo',
                    order: 4,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_gas_compliance',
              title: 'Compliance & Sign-off',
              description: 'Final compliance verification',
              order: 3,
              fields: {
                create: [
                  {
                    id: 'field_gas_code_compliance',
                    type: 'checkbox',
                    label: 'Meets Building Code',
                    order: 0,
                    required: true,
                  },
                  {
                    id: 'field_gas_permit',
                    type: 'text',
                    label: 'Permit Number',
                    order: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_inspector_signature',
                    type: 'signature',
                    label: 'Inspector Signature',
                    order: 2,
                    required: true,
                  },
                  {
                    id: 'field_gas_notes',
                    type: 'textarea',
                    label: 'Additional Notes',
                    order: 3,
                    required: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    console.log('Database seeded successfully!');

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      templates: [
        { id: vehicleTemplate.id, name: vehicleTemplate.name },
        { id: solarTemplate.id, name: solarTemplate.name },
        { id: gasTemplate.id, name: gasTemplate.name },
      ],
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
