import { track } from '@vercel/analytics';

export type AirbnbClickSource =
  | 'hero_cta'
  | 'hero_grid'
  | 'sticky_booking'
  | 'contact_sidebar'
  | 'contact_success'
  | 'reviews_cta';

/** Clic que abre el listado o perfil de Airbnb (reserva). */
export function trackAirbnbClick(source: AirbnbClickSource): void {
  track('conversion_airbnb_click', { source });
}

/** Formulario de contacto enviado correctamente. */
export function trackContactFormSuccess(): void {
  track('conversion_contact_submit', { result: 'success' });
}

/**
 * Clic en número de teléfono (mismo contacto que WhatsApp en datos).
 * `source`: hero | footer
 */
export function trackWhatsappPhoneClick(source: 'hero' | 'footer'): void {
  track('conversion_whatsapp_phone_click', { source });
}

/** Clic en enlace a Instagram. */
export function trackInstagramClick(source: 'discover_distrito06'): void {
  track('conversion_instagram_click', { source });
}
