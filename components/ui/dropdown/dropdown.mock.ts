import type { DropdownOption } from './dropdown.types'

export const categoriesMock = [
  { label: 'Desktops', value: 'Desktops' },
  { label: 'Laptops', value: 'Laptops' },
  { label: 'Workstations', value: 'Workstations' },
  { label: 'Monitors', value: 'Monitors' },
  { label: 'Printers', value: 'Printers' },
]

export const optionsMock: DropdownOption[] = [
  {
    label: 'HP recommends',
    value: 'hpRecommends',
    gtmSort: 'dropdownSelectSort1',
  },
  {
    label: 'Best seller',
    value: 'bestSeller',
    gtmSort: 'dropdownSelectSort2',
  },
  {
    label: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias dolore
    ipsa minus! A accusamus accusantium aliquam beatae corporis dicta
    dignissimos doloribus, eligendi eos error illum iure laudantium nemo
    non, nostrum odio quasi quibusdam quod repudiandae sequi sit tempore
    voluptatibus.`,
    value: 'priceLowToHigh',
    gtmSort: 'dropdownSelectSort3',
  },
  {
    label: 'Price high to low',
    value: 'priceHighToLow',
    gtmSort: 'dropdownSelectSort4',
  },
  {
    label: 'Highest discount ($)',
    value: 'highestDiscountM',
    disabled: true,
    gtmSort: 'dropdownSelectSort5',
  },
  {
    label: 'Highest discount (%)',
    value: 'highestDiscountP',
    gtmSort: 'dropdownSelectSort6',
  },
  {
    label: 'Name',
    value: 'name',
    gtmSort: 'dropdownSelectSort7',
  },
  {
    label: 'Rating',
    value: 'rating',
    gtmSort: 'dropdownSelectSort8',
  },
]
