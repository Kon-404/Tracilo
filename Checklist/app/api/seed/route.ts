/**
 * Database seed endpoint
 *
 * Call this endpoint once to seed the database with system templates
 * For security, this should be protected or removed after initial setup
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

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
        isSystem: true,
        createdBy: 'system',
        sections: {
          create: [
            {
              id: 'sec_vehicle_exterior',
              title: 'Exterior Inspection',
              description: 'Visual inspection of vehicle exterior',
              orderIndex: 0,
              fields: {
                create: [
                  {
                    id: 'field_vehicle_license',
                    type: 'text',
                    label: 'License Plate Number',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_make',
                    type: 'text',
                    label: 'Vehicle Make',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_model',
                    type: 'text',
                    label: 'Vehicle Model',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_year',
                    type: 'number',
                    label: 'Year',
                    orderIndex: 3,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_body',
                    type: 'dropdown',
                    label: 'Body Condition',
                    orderIndex: 4,
                    required: true,
                    config: {
                      options: ['Excellent', 'Good', 'Fair', 'Poor'],
                    },
                  },
                  {
                    id: 'field_vehicle_paint',
                    type: 'dropdown',
                    label: 'Paint Condition',
                    orderIndex: 5,
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
              orderIndex: 1,
              fields: {
                create: [
                  {
                    id: 'field_vehicle_tire_condition',
                    type: 'dropdown',
                    label: 'Overall Tire Condition',
                    orderIndex: 0,
                    required: true,
                    config: {
                      options: ['Excellent', 'Good', 'Fair', 'Poor'],
                    },
                  },
                  {
                    id: 'field_vehicle_tread',
                    type: 'number',
                    label: 'Tread Depth (mm)',
                    orderIndex: 1,
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
                    orderIndex: 2,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_vehicle_safety',
              title: 'Safety Equipment',
              description: 'Check required safety equipment',
              orderIndex: 2,
              fields: {
                create: [
                  {
                    id: 'field_vehicle_lights',
                    type: 'checkbox',
                    label: 'All Lights Functioning',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_signals',
                    type: 'checkbox',
                    label: 'Turn Signals Working',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_brakes',
                    type: 'checkbox',
                    label: 'Brakes Functioning Properly',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_vehicle_notes',
                    type: 'textarea',
                    label: 'Additional Notes',
                    orderIndex: 3,
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
        isSystem: true,
        createdBy: 'system',
        sections: {
          create: [
            {
              id: 'sec_solar_site',
              title: 'Site Information',
              description: 'Installation site details',
              orderIndex: 0,
              fields: {
                create: [
                  {
                    id: 'field_solar_address',
                    type: 'textarea',
                    label: 'Installation Address',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_date',
                    type: 'date',
                    label: 'Installation Date',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_installer',
                    type: 'text',
                    label: 'Installer Name',
                    orderIndex: 2,
                    required: true,
                  },
                ],
              },
            },
            {
              id: 'sec_solar_panels',
              title: 'Solar Panels',
              description: 'Panel installation details',
              orderIndex: 1,
              fields: {
                create: [
                  {
                    id: 'field_solar_panel_count',
                    type: 'number',
                    label: 'Number of Panels',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_panel_wattage',
                    type: 'number',
                    label: 'Panel Wattage (W)',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_total_capacity',
                    type: 'number',
                    label: 'Total System Capacity (kW)',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_solar_panel_photo',
                    type: 'photo',
                    label: 'Panel Installation Photo',
                    orderIndex: 3,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_solar_electrical',
              title: 'Electrical Connections',
              description: 'Electrical system checks',
              orderIndex: 2,
              fields: {
                create: [
                  {
                    id: 'field_solar_inverter',
                    type: 'text',
                    label: 'Inverter Model',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_voltage',
                    type: 'number',
                    label: 'System Voltage (V)',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_grounding',
                    type: 'checkbox',
                    label: 'Proper Grounding Verified',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_solar_electrical_photo',
                    type: 'photo',
                    label: 'Electrical Connection Photo',
                    orderIndex: 3,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_solar_compliance',
              title: 'Compliance & Testing',
              description: 'Final compliance checks',
              orderIndex: 3,
              fields: {
                create: [
                  {
                    id: 'field_solar_permits',
                    type: 'checkbox',
                    label: 'All Permits Obtained',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_solar_standards',
                    type: 'checkbox',
                    label: 'Meets Local Standards',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_solar_testing',
                    type: 'checkbox',
                    label: 'System Testing Complete',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_solar_notes',
                    type: 'textarea',
                    label: 'Additional Notes',
                    orderIndex: 3,
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
        isSystem: true,
        createdBy: 'system',
        sections: {
          create: [
            {
              id: 'sec_gas_site',
              title: 'Site Information',
              description: 'Installation location details',
              orderIndex: 0,
              fields: {
                create: [
                  {
                    id: 'field_gas_address',
                    type: 'textarea',
                    label: 'Installation Address',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_gas_date',
                    type: 'date',
                    label: 'Installation Date',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_installer',
                    type: 'text',
                    label: 'Installer Name',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_gas_license',
                    type: 'text',
                    label: 'Installer License Number',
                    orderIndex: 3,
                    required: true,
                  },
                ],
              },
            },
            {
              id: 'sec_gas_installation',
              title: 'Installation Details',
              description: 'Gas line and appliance details',
              orderIndex: 1,
              fields: {
                create: [
                  {
                    id: 'field_gas_type',
                    type: 'dropdown',
                    label: 'Gas Type',
                    orderIndex: 0,
                    required: true,
                    config: {
                      options: ['Natural Gas', 'Propane', 'LPG'],
                    },
                  },
                  {
                    id: 'field_gas_pipe_size',
                    type: 'text',
                    label: 'Pipe Size',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_pipe_material',
                    type: 'dropdown',
                    label: 'Pipe Material',
                    orderIndex: 2,
                    required: true,
                    config: {
                      options: ['Steel', 'Copper', 'CSST', 'PE'],
                    },
                  },
                  {
                    id: 'field_gas_appliance',
                    type: 'text',
                    label: 'Appliance Connected',
                    orderIndex: 3,
                    required: true,
                  },
                ],
              },
            },
            {
              id: 'sec_gas_safety',
              title: 'Safety Checks',
              description: 'Required safety inspections',
              orderIndex: 2,
              fields: {
                create: [
                  {
                    id: 'field_gas_leak_test',
                    type: 'checkbox',
                    label: 'Leak Test Passed',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_gas_pressure',
                    type: 'number',
                    label: 'Operating Pressure (kPa)',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_ventilation',
                    type: 'checkbox',
                    label: 'Proper Ventilation Verified',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_gas_shutoff',
                    type: 'checkbox',
                    label: 'Shutoff Valve Accessible',
                    orderIndex: 3,
                    required: true,
                  },
                  {
                    id: 'field_gas_photo',
                    type: 'photo',
                    label: 'Installation Photo',
                    orderIndex: 4,
                    required: false,
                  },
                ],
              },
            },
            {
              id: 'sec_gas_compliance',
              title: 'Compliance & Sign-off',
              description: 'Final compliance verification',
              orderIndex: 3,
              fields: {
                create: [
                  {
                    id: 'field_gas_code_compliance',
                    type: 'checkbox',
                    label: 'Meets Building Code',
                    orderIndex: 0,
                    required: true,
                  },
                  {
                    id: 'field_gas_permit',
                    type: 'text',
                    label: 'Permit Number',
                    orderIndex: 1,
                    required: true,
                  },
                  {
                    id: 'field_gas_inspector_signature',
                    type: 'signature',
                    label: 'Inspector Signature',
                    orderIndex: 2,
                    required: true,
                  },
                  {
                    id: 'field_gas_notes',
                    type: 'textarea',
                    label: 'Additional Notes',
                    orderIndex: 3,
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
