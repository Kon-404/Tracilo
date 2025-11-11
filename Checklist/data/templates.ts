/**
 * Sample form templates for MVP
 *
 * These hard-coded templates demonstrate the three initial use cases:
 * - Vehicle daily checklist
 * - Solar installation site checklist
 * - Gas installation site checklist
 *
 * In production, these would be stored in a database and managed via admin UI.
 */

import { FormTemplate } from '@/types';

/**
 * Vehicle Daily Checklist Template
 * Used for pre-departure vehicle safety and condition checks
 */
export const vehicleTemplate: FormTemplate = {
  id: 'tpl_vehicle_001',
  name: 'Vehicle Daily Checklist',
  category: 'vehicle',
  description: 'Complete this checklist before starting your journey to ensure vehicle safety and readiness.',
  icon: '🚗',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  sections: [
    {
      id: 'sec_veh_001',
      templateId: 'tpl_vehicle_001',
      title: 'Pre-Departure Checks',
      description: 'Basic safety checks before starting the vehicle',
      order: 1,
      fields: [
        {
          id: 'fld_veh_001',
          sectionId: 'sec_veh_001',
          type: 'date',
          label: 'Inspection Date',
          required: true,
          order: 1,
        },
        {
          id: 'fld_veh_002',
          sectionId: 'sec_veh_001',
          type: 'text',
          label: 'Vehicle Registration',
          placeholder: 'e.g., ABC-123-GP',
          required: true,
          order: 2,
        },
        {
          id: 'fld_veh_003',
          sectionId: 'sec_veh_001',
          type: 'number',
          label: 'Odometer Reading',
          placeholder: 'Current mileage',
          required: true,
          order: 3,
          config: {
            min: 0,
            unit: 'km',
          },
        },
        {
          id: 'fld_veh_004',
          sectionId: 'sec_veh_001',
          type: 'text',
          label: "Driver's Name",
          placeholder: 'Full name',
          required: true,
          order: 4,
        },
      ],
    },
    {
      id: 'sec_veh_002',
      templateId: 'tpl_vehicle_001',
      title: 'Exterior Inspection',
      description: 'Walk-around vehicle exterior checks',
      order: 2,
      fields: [
        {
          id: 'fld_veh_005',
          sectionId: 'sec_veh_002',
          type: 'dropdown',
          label: 'Tyre Condition',
          required: true,
          order: 1,
          config: {
            options: ['Good', 'Fair', 'Needs Replacement', 'Damaged'],
          },
        },
        {
          id: 'fld_veh_006',
          sectionId: 'sec_veh_002',
          type: 'checkbox',
          label: 'All lights functioning (headlights, brake lights, indicators)',
          required: true,
          order: 2,
        },
        {
          id: 'fld_veh_007',
          sectionId: 'sec_veh_002',
          type: 'checkbox',
          label: 'No visible body damage or leaks',
          required: false,
          order: 3,
        },
        {
          id: 'fld_veh_008',
          sectionId: 'sec_veh_002',
          type: 'photo',
          label: 'Vehicle Exterior Photo',
          helpText: 'Take a photo of the vehicle from the front',
          required: false,
          order: 4,
          config: {
            maxFiles: 1,
          },
        },
      ],
    },
    {
      id: 'sec_veh_003',
      templateId: 'tpl_vehicle_001',
      title: 'Interior & Safety Equipment',
      description: 'Check cabin and safety equipment',
      order: 3,
      fields: [
        {
          id: 'fld_veh_009',
          sectionId: 'sec_veh_003',
          type: 'checkbox',
          label: 'Seatbelts working properly',
          required: true,
          order: 1,
        },
        {
          id: 'fld_veh_010',
          sectionId: 'sec_veh_003',
          type: 'checkbox',
          label: 'Fire extinguisher present and in date',
          required: true,
          order: 2,
        },
        {
          id: 'fld_veh_011',
          sectionId: 'sec_veh_003',
          type: 'checkbox',
          label: 'First aid kit available',
          required: true,
          order: 3,
        },
        {
          id: 'fld_veh_012',
          sectionId: 'sec_veh_003',
          type: 'dropdown',
          label: 'Fuel Level',
          required: true,
          order: 4,
          config: {
            options: ['Full', '3/4', '1/2', '1/4', 'Low - Refuel Required'],
          },
        },
      ],
    },
    {
      id: 'sec_veh_004',
      templateId: 'tpl_vehicle_001',
      title: 'Additional Notes',
      order: 4,
      fields: [
        {
          id: 'fld_veh_013',
          sectionId: 'sec_veh_004',
          type: 'textarea',
          label: 'Defects or Issues Identified',
          placeholder: 'Describe any problems or maintenance needs...',
          required: false,
          order: 1,
          config: {
            maxLength: 500,
          },
        },
        {
          id: 'fld_veh_014',
          sectionId: 'sec_veh_004',
          type: 'dropdown',
          label: 'Vehicle Fitness for Use',
          required: true,
          order: 2,
          config: {
            options: ['Fit for Use', 'Requires Minor Repairs', 'Unsafe - Do Not Use'],
          },
        },
      ],
    },
  ],
};

/**
 * Solar Installation Site Checklist Template
 * Used for on-site solar panel installation inspections
 */
export const solarTemplate: FormTemplate = {
  id: 'tpl_solar_001',
  name: 'Solar Installation Checklist',
  category: 'solar',
  description: 'Site inspection checklist for solar panel installations and compliance verification.',
  icon: '☀️',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  sections: [
    {
      id: 'sec_sol_001',
      templateId: 'tpl_solar_001',
      title: 'Site Information',
      order: 1,
      fields: [
        {
          id: 'fld_sol_001',
          sectionId: 'sec_sol_001',
          type: 'date',
          label: 'Inspection Date',
          required: true,
          order: 1,
        },
        {
          id: 'fld_sol_002',
          sectionId: 'sec_sol_001',
          type: 'text',
          label: 'Site Address',
          placeholder: 'Full installation address',
          required: true,
          order: 2,
        },
        {
          id: 'fld_sol_003',
          sectionId: 'sec_sol_001',
          type: 'text',
          label: 'Client Name',
          required: true,
          order: 3,
        },
        {
          id: 'fld_sol_004',
          sectionId: 'sec_sol_001',
          type: 'text',
          label: 'Installation Technician',
          required: true,
          order: 4,
        },
      ],
    },
    {
      id: 'sec_sol_002',
      templateId: 'tpl_solar_001',
      title: 'Structural Assessment',
      description: 'Roof and mounting structure evaluation',
      order: 2,
      fields: [
        {
          id: 'fld_sol_005',
          sectionId: 'sec_sol_002',
          type: 'dropdown',
          label: 'Roof Type',
          required: true,
          order: 1,
          config: {
            options: ['Tile', 'Metal Sheeting', 'IBR', 'Corrugated', 'Flat Concrete', 'Other'],
          },
        },
        {
          id: 'fld_sol_006',
          sectionId: 'sec_sol_002',
          type: 'dropdown',
          label: 'Roof Condition',
          required: true,
          order: 2,
          config: {
            options: ['Excellent', 'Good', 'Fair', 'Poor - Repairs Needed'],
          },
        },
        {
          id: 'fld_sol_007',
          sectionId: 'sec_sol_002',
          type: 'checkbox',
          label: 'Roof structure can support panel weight',
          required: true,
          order: 3,
        },
        {
          id: 'fld_sol_008',
          sectionId: 'sec_sol_002',
          type: 'photo',
          label: 'Roof/Mounting Area Photo',
          required: false,
          order: 4,
        },
      ],
    },
    {
      id: 'sec_sol_003',
      templateId: 'tpl_solar_001',
      title: 'Panel Installation',
      order: 3,
      fields: [
        {
          id: 'fld_sol_009',
          sectionId: 'sec_sol_003',
          type: 'number',
          label: 'Number of Panels Installed',
          required: true,
          order: 1,
          config: {
            min: 1,
            step: 1,
          },
        },
        {
          id: 'fld_sol_010',
          sectionId: 'sec_sol_003',
          type: 'text',
          label: 'Panel Make and Model',
          placeholder: 'e.g., Canadian Solar CS3W-400MS',
          required: true,
          order: 2,
        },
        {
          id: 'fld_sol_011',
          sectionId: 'sec_sol_003',
          type: 'checkbox',
          label: 'Panels securely mounted and aligned',
          required: true,
          order: 3,
        },
        {
          id: 'fld_sol_012',
          sectionId: 'sec_sol_003',
          type: 'checkbox',
          label: 'All electrical connections properly terminated',
          required: true,
          order: 4,
        },
        {
          id: 'fld_sol_013',
          sectionId: 'sec_sol_003',
          type: 'photo',
          label: 'Installed Panels Photo',
          required: false,
          order: 5,
        },
      ],
    },
    {
      id: 'sec_sol_004',
      templateId: 'tpl_solar_001',
      title: 'Electrical & Safety',
      order: 4,
      fields: [
        {
          id: 'fld_sol_014',
          sectionId: 'sec_sol_004',
          type: 'number',
          label: 'System Voltage (V)',
          required: true,
          order: 1,
          config: {
            min: 0,
            unit: 'V',
          },
        },
        {
          id: 'fld_sol_015',
          sectionId: 'sec_sol_004',
          type: 'checkbox',
          label: 'Inverter installed and functioning',
          required: true,
          order: 2,
        },
        {
          id: 'fld_sol_016',
          sectionId: 'sec_sol_004',
          type: 'checkbox',
          label: 'Earthing and surge protection in place',
          required: true,
          order: 3,
        },
        {
          id: 'fld_sol_017',
          sectionId: 'sec_sol_004',
          type: 'checkbox',
          label: 'DC and AC isolators clearly labeled',
          required: true,
          order: 4,
        },
        {
          id: 'fld_sol_018',
          sectionId: 'sec_sol_004',
          type: 'photo',
          label: 'Inverter & Distribution Board Photo',
          required: false,
          order: 5,
        },
      ],
    },
    {
      id: 'sec_sol_005',
      templateId: 'tpl_solar_001',
      title: 'Compliance & Sign-off',
      order: 5,
      fields: [
        {
          id: 'fld_sol_019',
          sectionId: 'sec_sol_005',
          type: 'checkbox',
          label: 'Installation complies with SANS 10142-1',
          helpText: 'Wiring of premises standard',
          required: true,
          order: 1,
        },
        {
          id: 'fld_sol_020',
          sectionId: 'sec_sol_005',
          type: 'dropdown',
          label: 'Certificate of Compliance (CoC) Status',
          required: true,
          order: 2,
          config: {
            options: ['Issued', 'Pending', 'Not Required'],
          },
        },
        {
          id: 'fld_sol_021',
          sectionId: 'sec_sol_005',
          type: 'textarea',
          label: 'Additional Notes',
          placeholder: 'Any observations, client requests, or follow-up required...',
          required: false,
          order: 3,
        },
      ],
    },
  ],
};

/**
 * Gas Installation Site Checklist Template
 * Used for gas installation safety and compliance checks
 */
export const gasTemplate: FormTemplate = {
  id: 'tpl_gas_001',
  name: 'Gas Installation Checklist',
  category: 'gas',
  description: 'Safety and compliance checklist for gas appliance installations (LPG/natural gas).',
  icon: '🔥',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  sections: [
    {
      id: 'sec_gas_001',
      templateId: 'tpl_gas_001',
      title: 'Installation Details',
      order: 1,
      fields: [
        {
          id: 'fld_gas_001',
          sectionId: 'sec_gas_001',
          type: 'date',
          label: 'Installation Date',
          required: true,
          order: 1,
        },
        {
          id: 'fld_gas_002',
          sectionId: 'sec_gas_001',
          type: 'text',
          label: 'Site Address',
          required: true,
          order: 2,
        },
        {
          id: 'fld_gas_003',
          sectionId: 'sec_gas_001',
          type: 'text',
          label: 'Client Name',
          required: true,
          order: 3,
        },
        {
          id: 'fld_gas_004',
          sectionId: 'sec_gas_001',
          type: 'text',
          label: 'Registered Gas Practitioner Name',
          required: true,
          order: 4,
        },
        {
          id: 'fld_gas_005',
          sectionId: 'sec_gas_001',
          type: 'text',
          label: 'SAQCC Gas Registration Number',
          placeholder: 'e.g., GP123456',
          required: true,
          order: 5,
        },
      ],
    },
    {
      id: 'sec_gas_002',
      templateId: 'tpl_gas_001',
      title: 'Appliance Information',
      order: 2,
      fields: [
        {
          id: 'fld_gas_006',
          sectionId: 'sec_gas_002',
          type: 'dropdown',
          label: 'Appliance Type',
          required: true,
          order: 1,
          config: {
            options: ['Gas Stove', 'Gas Geyser', 'Gas Heater', 'Gas Fireplace', 'BBQ/Braai', 'Other'],
          },
        },
        {
          id: 'fld_gas_007',
          sectionId: 'sec_gas_002',
          type: 'text',
          label: 'Appliance Make and Model',
          required: true,
          order: 2,
        },
        {
          id: 'fld_gas_008',
          sectionId: 'sec_gas_002',
          type: 'dropdown',
          label: 'Gas Type',
          required: true,
          order: 3,
          config: {
            options: ['LPG (9kg/19kg Bottle)', 'LPG (Bulk)', 'Natural Gas/Piped'],
          },
        },
        {
          id: 'fld_gas_009',
          sectionId: 'sec_gas_002',
          type: 'photo',
          label: 'Appliance Photo',
          required: false,
          order: 4,
        },
      ],
    },
    {
      id: 'sec_gas_003',
      templateId: 'tpl_gas_001',
      title: 'Installation Checks',
      description: 'Physical installation verification',
      order: 3,
      fields: [
        {
          id: 'fld_gas_010',
          sectionId: 'sec_gas_003',
          type: 'checkbox',
          label: 'Appliance securely fixed and level',
          required: true,
          order: 1,
        },
        {
          id: 'fld_gas_011',
          sectionId: 'sec_gas_003',
          type: 'checkbox',
          label: 'Adequate ventilation provided',
          helpText: 'As per SANS 10087-1 requirements',
          required: true,
          order: 2,
        },
        {
          id: 'fld_gas_012',
          sectionId: 'sec_gas_003',
          type: 'checkbox',
          label: 'Clearances from combustible materials maintained',
          required: true,
          order: 3,
        },
        {
          id: 'fld_gas_013',
          sectionId: 'sec_gas_003',
          type: 'dropdown',
          label: 'Pipe Material Used',
          required: true,
          order: 4,
          config: {
            options: ['Copper', 'Stainless Steel Flexible', 'CSST', 'Black Iron'],
          },
        },
        {
          id: 'fld_gas_014',
          sectionId: 'sec_gas_003',
          type: 'checkbox',
          label: 'All joints properly sealed and tested',
          required: true,
          order: 5,
        },
      ],
    },
    {
      id: 'sec_gas_004',
      templateId: 'tpl_gas_001',
      title: 'Safety & Testing',
      description: 'Leak testing and safety verification',
      order: 4,
      fields: [
        {
          id: 'fld_gas_015',
          sectionId: 'sec_gas_004',
          type: 'dropdown',
          label: 'Leak Test Result',
          required: true,
          order: 1,
          config: {
            options: ['Passed - No Leaks Detected', 'Failed - Leaks Found and Repaired', 'Failed - Repairs Required'],
          },
        },
        {
          id: 'fld_gas_016',
          sectionId: 'sec_gas_004',
          type: 'number',
          label: 'Test Pressure (kPa)',
          required: true,
          order: 2,
          config: {
            min: 0,
            unit: 'kPa',
          },
        },
        {
          id: 'fld_gas_017',
          sectionId: 'sec_gas_004',
          type: 'checkbox',
          label: 'Appliance ignition tested successfully',
          required: true,
          order: 3,
        },
        {
          id: 'fld_gas_018',
          sectionId: 'sec_gas_004',
          type: 'checkbox',
          label: 'Flame appearance correct (blue, stable)',
          required: true,
          order: 4,
        },
        {
          id: 'fld_gas_019',
          sectionId: 'sec_gas_004',
          type: 'checkbox',
          label: 'Emergency shut-off accessible and labeled',
          required: true,
          order: 5,
        },
      ],
    },
    {
      id: 'sec_gas_005',
      templateId: 'tpl_gas_001',
      title: 'Compliance & Documentation',
      order: 5,
      fields: [
        {
          id: 'fld_gas_020',
          sectionId: 'sec_gas_005',
          type: 'checkbox',
          label: 'Installation complies with SANS 10087-1',
          helpText: 'Installation of gas-consuming equipment',
          required: true,
          order: 1,
        },
        {
          id: 'fld_gas_021',
          sectionId: 'sec_gas_005',
          type: 'dropdown',
          label: 'Certificate of Conformity (CoC) Status',
          required: true,
          order: 2,
          config: {
            options: ['Issued to Client', 'Will be Issued (pending paperwork)', 'Not Applicable'],
          },
        },
        {
          id: 'fld_gas_022',
          sectionId: 'sec_gas_005',
          type: 'checkbox',
          label: 'Client briefed on safe operation and maintenance',
          required: true,
          order: 3,
        },
        {
          id: 'fld_gas_023',
          sectionId: 'sec_gas_005',
          type: 'textarea',
          label: 'Additional Notes or Defects',
          placeholder: 'Record any issues, follow-up actions, or client requests...',
          required: false,
          order: 4,
        },
      ],
    },
  ],
};

/**
 * Export all templates as an array for easy iteration
 */
export const allTemplates: FormTemplate[] = [
  vehicleTemplate,
  solarTemplate,
  gasTemplate,
];

/**
 * Get a template by ID
 * @param id - Template ID to retrieve
 * @returns Template or undefined if not found
 */
export function getTemplateById(id: string): FormTemplate | undefined {
  return allTemplates.find((template) => template.id === id);
}

/**
 * Get templates by category
 * @param category - Category to filter by
 * @returns Array of matching templates
 */
export function getTemplatesByCategory(category: string): FormTemplate[] {
  return allTemplates.filter((template) => template.category === category);
}
