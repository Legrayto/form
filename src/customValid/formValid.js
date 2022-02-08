import { helpers } from 'vuelidate/lib/validators'

export const numberValid = (value) => !helpers.req(value) || value[0] == 7 
export const numberLength = (value) => !helpers.req(value) || value.length === 11 
export const pasportLength = (value) => !helpers.req(value) || value.length === 4
export const seriesLength = (value) => !helpers.req(value) || value.length === 6

export const alphaValid = (value) => !helpers.req(value) || /^[а-яё]*$/i.test(value)