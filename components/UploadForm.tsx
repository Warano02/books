"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Image, Upload } from 'lucide-react'

// zod schema for the form
const MAX_PDF_SIZE = 50 * 1024 * 1024 // 50MB

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    author: z.string().min(1, { message: 'Author name is required' }),
    voice: z.enum(['Dave', 'Daniel', 'Chris', 'Rachel', 'Sarah']),
    pdfFile: z
        .any()
        .refine(file => file instanceof File, { message: 'PDF file is required' })
        .refine(file => file?.type === 'application/pdf', { message: 'Must be a PDF' })
        .refine(file => file?.size <= MAX_PDF_SIZE, { message: 'Max size 50MB' }),
    coverImage: z
        .any()
        .optional()
        .nullable()
        .refine(file => !file || file instanceof File, { message: 'Invalid file' }),
})

type FormValues = z.infer<typeof formSchema>

function UploadForm() {
    const [submitting, setSubmitting] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            voice: 'Rachel',
            pdfFile: null,
            coverImage: null,
            title: '',
            author: '',
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = form

    const pdfFile = watch('pdfFile') as File | null
    const coverImage = watch('coverImage') as File | null
    const voice = watch('voice')

    const onSubmit = async (data: FormValues) => {
        setSubmitting(true)
        try {
            console.log('submitted', data)
            await new Promise(resolve => setTimeout(resolve, 1500))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="new-book-wrapper relative">
            {submitting && (
                <div className="loading-wrapper">
                    <span className="text-white text-xl">Loading...</span>
                </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="form-label">PDF file</label>
                    <div
                        className="upload-dropzone"
                        onClick={() => document.getElementById('pdf-input')?.click()}
                    >
                        <Upload className="upload-dropzone-icon" />
                        <div className="upload-dropzone-text">Click to upload PDF</div>
                        <div className="upload-dropzone-hint">PDF file (max 50MB)</div>
                        <input
                            id="pdf-input"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={e => {
                                const file = e.target.files?.[0] ?? null
                                setValue('pdfFile', file)
                            }}
                        />
                    </div>
                    {pdfFile && (
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm">{pdfFile.name}</span>
                            <span
                                className="upload-dropzone-remove"
                                onClick={() => setValue('pdfFile', null)}
                            >
                                &times;
                            </span>
                        </div>
                    )}
                    {errors.pdfFile && (
                        <p className="text-red-600 text-sm">{errors.pdfFile.message?.toString()}</p>
                    )}
                </div>

                <div>
                    <label className="form-label">Cover image</label>
                    <div
                        className="upload-dropzone"
                        onClick={() => document.getElementById('cover-input')?.click()}
                    >
                        <Image className="upload-dropzone-icon" />
                   
                    <div className="upload-dropzone-text">
                        Click to upload cover image
                    </div>
                    <div className="upload-dropzone-hint">
                        Leave empty to auto-generate from PDF
                    </div>
                    <input
                        id="cover-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                            const file = e.target.files?.[0] ?? null
                            setValue('coverImage', file)
                        }}
                    />
                </div>
                {coverImage && (
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm">{coverImage.name}</span>
                        <span
                            className="upload-dropzone-remove"
                            onClick={() => setValue('coverImage', null)}
                        >
                            &times;
                        </span>
                    </div>
                )}
                {errors.coverImage && (
                    <p className="text-red-600 text-sm">{errors.coverImage.message?.toString()}</p>
                )}
        </div>

    <div>
        <label className="form-label" htmlFor="title">
            Title
        </label>
        <input
            id="title"
            className="form-input"
            placeholder="ex: Rich Dad Poor Dad"
            {...register('title')}
        />
        {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
    </div>


    <div>
        <label className="form-label" htmlFor="author">
            Author Name
        </label>
        <input
            id="author"
            className="form-input"
            placeholder="ex: Robert Kiyosaki"
            {...register('author')}
        />
        {errors.author && (
            <p className="text-red-600 text-sm">{errors.author.message}</p>
        )}
    </div>

                <div>
                    <label className="form-label">Choose Assistant Voice</label>
                    <div className="space-y-4">
                        <div>
                            <div className="font-medium mb-2">Male Voices</div>
                            <div className="voice-selector-options">
                                {['Dave', 'Daniel', 'Chris'].map(name => (
                                    <label
                                        key={name}
                                        className={`voice-selector-option ${voice === name
                                            ? 'voice-selector-option-selected'
                                            : 'voice-selector-option-default'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            className="hidden"
                                            value={name}
                                            {...register('voice')}
                                        />
                                        <div className="flex flex-col items-center">
                                            <span>{name}</span>
                                            <span className="text-sm text-(--text-muted)">
                                                {name === 'Dave' &&
                                                    'Young male, British‑Essex, casual & conversational'}
                                                {name === 'Daniel' &&
                                                    'Middle‑aged male, British, authoritative but warm'}
                                                {name === 'Chris' &&
                                                    'Male, casual & easy‑going'}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="font-medium mb-2">Female Voices</div>
                            <div className="voice-selector-options">
                                {['Rachel', 'Sarah'].map(name => (
                                    <label
                                        key={name}
                                        className={`voice-selector-option ${voice === name
                                            ? 'voice-selector-option-selected'
                                            : 'voice-selector-option-default'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            className="hidden"
                                            value={name}
                                            {...register('voice')}
                                        />
                                        <div className="flex flex-col items-center">
                                            <span>{name}</span>
                                            <span className="text-sm text-(--text-muted)">
                                                {name === 'Rachel' &&
                                                    'Young female, American, calm & clear'}
                                                {name === 'Sarah' &&
                                                    'Young female, American, soft & approachable'}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="form-btn">
                    Begin Synthesis
                </button>
            </form >
        </div >
    )
}

export default UploadForm