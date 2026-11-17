import React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'



const Email = ({ inviter }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Le invitaron a practicar en pracTICAtecnica.com</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>pracTICAtecnica.com</Heading>
        <Text style={text}>{inviter ? `${inviter} le invitó` : 'Le invitamos'} a repasar y practicar para sus exámenes: MOPT, admisión universitaria, CTP y más.</Text>
        <Text style={text}>Pruebe gratis durante 13 días.</Text>
        <Button href="https://practicatecnica.com/auth" style={button}>Crear mi cuenta</Button>
        <Text style={small}>Repase. Practique. Prepárese.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Invitación a pracTICAtecnica.com',
  displayName: 'Invitación',
  previewData: { inviter: 'Max Salazar' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Figtree, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '520px' }
const h1 = { color: '#0b1a33', fontSize: '24px', fontWeight: 900 }
const text = { color: '#1f2937', fontSize: '16px', lineHeight: '24px' }
const button = { backgroundColor: '#1d6bff', color: '#ffffff', borderRadius: '12px', padding: '12px 22px', fontWeight: 700 }
const small = { color: '#6b7280', fontSize: '13px', marginTop: '24px' }

