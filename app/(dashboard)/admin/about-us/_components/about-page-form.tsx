'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { saveAboutPageAction, type AboutPageActionState } from '../_lib/actions'
import type { AboutPageFormValues } from '../_lib/schemas'

export function AboutPageForm({ initial }: { initial: AboutPageFormValues }) {
  const [state, formAction] = useActionState<AboutPageActionState, FormData>(saveAboutPageAction, {})

  return (
    <form action={formAction} className="space-y-6">
      <SectionCard
        title="About Us"
        description="HTML content plus tag chips displayed beneath the section."
        defaultOpen
      >
        <InputField
          label="Section title"
          name="aboutTitle"
          defaultValue={initial.aboutTitle}
          error={state.fieldErrors?.aboutTitle?.[0]}
          autoFocus
        />
        <TextareaField
          label="HTML content"
          name="aboutContent"
          defaultValue={initial.aboutContent}
          error={state.fieldErrors?.aboutContent?.[0]}
          rows={10}
        />
        <TextareaField
          label="Tags"
          name="aboutTags"
          defaultValue={initial.aboutTags}
          error={state.fieldErrors?.aboutTags?.[0]}
          rows={4}
          description="Use one tag per line or separate multiple tags with commas."
        />
      </SectionCard>

      <SectionCard title="Mission" description="HTML content with a highlighted quote.">
        <InputField
          label="Section title"
          name="missionTitle"
          defaultValue={initial.missionTitle}
          error={state.fieldErrors?.missionTitle?.[0]}
        />
        <TextareaField
          label="HTML content"
          name="missionContent"
          defaultValue={initial.missionContent}
          error={state.fieldErrors?.missionContent?.[0]}
          rows={8}
        />
        <InputField
          label="Quote"
          name="missionQuote"
          defaultValue={initial.missionQuote}
          error={state.fieldErrors?.missionQuote?.[0]}
        />
      </SectionCard>

      <SectionCard
        title="What We Publish"
        description="Intro paragraphs are separated by blank lines. CTA href should be an internal route."
      >
        <InputField
          label="Section title"
          name="publishTitle"
          defaultValue={initial.publishTitle}
          error={state.fieldErrors?.publishTitle?.[0]}
        />
        <TextareaField
          label="Intro paragraphs"
          name="publishIntro"
          defaultValue={initial.publishIntro}
          error={state.fieldErrors?.publishIntro?.[0]}
          rows={6}
        />
        <InputField
          label="CTA href"
          name="publishCtaHref"
          defaultValue={initial.publishCtaHref}
          error={state.fieldErrors?.publishCtaHref?.[0]}
        />
        <TextareaField
          label="Outro"
          name="publishOutro"
          defaultValue={initial.publishOutro}
          error={state.fieldErrors?.publishOutro?.[0]}
          rows={3}
        />
        <ItemFields
          index={1}
          titleValue={initial.publishItem1Title}
          descriptionValue={initial.publishItem1Description}
          titleError={state.fieldErrors?.publishItem1Title?.[0]}
          descriptionError={state.fieldErrors?.publishItem1Description?.[0]}
        />
        <ItemFields
          index={2}
          titleValue={initial.publishItem2Title}
          descriptionValue={initial.publishItem2Description}
          titleError={state.fieldErrors?.publishItem2Title?.[0]}
          descriptionError={state.fieldErrors?.publishItem2Description?.[0]}
        />
        <ItemFields
          index={3}
          titleValue={initial.publishItem3Title}
          descriptionValue={initial.publishItem3Description}
          titleError={state.fieldErrors?.publishItem3Title?.[0]}
          descriptionError={state.fieldErrors?.publishItem3Description?.[0]}
        />
        <ItemFields
          index={4}
          titleValue={initial.publishItem4Title}
          descriptionValue={initial.publishItem4Description}
          titleError={state.fieldErrors?.publishItem4Title?.[0]}
          descriptionError={state.fieldErrors?.publishItem4Description?.[0]}
        />
      </SectionCard>

      <SectionCard title="Perspective" description="Three fixed cards with title and body content.">
        <InputField
          label="Section title"
          name="perspectiveTitle"
          defaultValue={initial.perspectiveTitle}
          error={state.fieldErrors?.perspectiveTitle?.[0]}
        />
        <CardFields
          index={1}
          titleValue={initial.perspectiveCard1Title}
          contentValue={initial.perspectiveCard1Content}
          titleError={state.fieldErrors?.perspectiveCard1Title?.[0]}
          contentError={state.fieldErrors?.perspectiveCard1Content?.[0]}
        />
        <CardFields
          index={2}
          titleValue={initial.perspectiveCard2Title}
          contentValue={initial.perspectiveCard2Content}
          titleError={state.fieldErrors?.perspectiveCard2Title?.[0]}
          contentError={state.fieldErrors?.perspectiveCard2Content?.[0]}
        />
        <CardFields
          index={3}
          titleValue={initial.perspectiveCard3Title}
          contentValue={initial.perspectiveCard3Content}
          titleError={state.fieldErrors?.perspectiveCard3Title?.[0]}
          contentError={state.fieldErrors?.perspectiveCard3Content?.[0]}
        />
      </SectionCard>

      <SectionCard
        title="Editorial Background"
        description="HTML content for the closing editorial section."
      >
        <InputField
          label="Section title"
          name="editorialBackgroundTitle"
          defaultValue={initial.editorialBackgroundTitle}
          error={state.fieldErrors?.editorialBackgroundTitle?.[0]}
        />
        <TextareaField
          label="HTML content"
          name="editorialBackgroundContent"
          defaultValue={initial.editorialBackgroundContent}
          error={state.fieldErrors?.editorialBackgroundContent?.[0]}
          rows={10}
        />
      </SectionCard>

      {state.formError && <p className="text-destructive text-sm">{state.formError}</p>}

      <div className="flex items-center gap-2">
        <SubmitButton>Save About Us</SubmitButton>
      </div>
    </form>
  )
}

function SectionCard({
  title,
  description,
  defaultOpen = false,
  children,
}: {
  title: string
  description: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <Card>
        <CollapsibleTrigger asChild>
          <button type="button" className="w-full text-left">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              <ChevronRightIcon className="text-muted-foreground mt-1 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CardHeader>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 border-t pt-4">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

type InputFieldProps = {
  label: string
  name: string
  defaultValue?: string
  error?: string
} & React.ComponentProps<typeof Input>

function InputField({ label, name, defaultValue, error, ...rest }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={!!error || undefined}
        {...rest}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

type TextareaFieldProps = {
  label: string
  name: string
  defaultValue?: string
  error?: string
  description?: string
} & React.ComponentProps<typeof Textarea>

function TextareaField({
  label,
  name,
  defaultValue,
  error,
  description,
  ...rest
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={!!error || undefined}
        {...rest}
      />
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

function ItemFields({
  index,
  titleValue,
  descriptionValue,
  titleError,
  descriptionError,
}: {
  index: number
  titleValue?: string
  descriptionValue?: string
  titleError?: string
  descriptionError?: string
}) {
  return (
    <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
      <InputField
        label={`Item ${index} title`}
        name={`publishItem${index}Title`}
        defaultValue={titleValue}
        error={titleError}
      />
      <TextareaField
        label={`Item ${index} description`}
        name={`publishItem${index}Description`}
        defaultValue={descriptionValue}
        error={descriptionError}
        rows={4}
      />
    </div>
  )
}

function CardFields({
  index,
  titleValue,
  contentValue,
  titleError,
  contentError,
}: {
  index: number
  titleValue?: string
  contentValue?: string
  titleError?: string
  contentError?: string
}) {
  return (
    <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
      <InputField
        label={`Card ${index} title`}
        name={`perspectiveCard${index}Title`}
        defaultValue={titleValue}
        error={titleError}
      />
      <TextareaField
        label={`Card ${index} content`}
        name={`perspectiveCard${index}Content`}
        defaultValue={contentValue}
        error={contentError}
        rows={4}
      />
    </div>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return <Button disabled={pending}>{pending ? 'Saving…' : children}</Button>
}
