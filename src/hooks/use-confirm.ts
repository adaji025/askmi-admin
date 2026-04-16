"use client"

import { createElement, useCallback, useState, type ReactElement } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ConfirmState = {
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  loadingLabel: string
  onConfirm?: (() => Promise<void> | void) | null
}

type ConfirmOptions = {
  confirmLabel?: string
  cancelLabel?: string
  loadingLabel?: string
  onConfirm?: (() => Promise<void> | void) | null
}

export function useConfirm() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<ConfirmState>({
    title: "Are you sure?",
    message: "Please confirm this action.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    loadingLabel: "Loading...",
    onConfirm: null,
  })
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const confirm = useCallback((message: string, title = "Are you sure?", options?: ConfirmOptions) => {
    setState({
      title,
      message,
      confirmLabel: options?.confirmLabel ?? "Confirm",
      cancelLabel: options?.cancelLabel ?? "Cancel",
      loadingLabel: options?.loadingLabel ?? "Loading...",
      onConfirm: options?.onConfirm ?? null,
    })
    setIsProcessing(false)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve)
    })
  }, [])

  const handleClose = useCallback(
    (value: boolean) => {
      if (isProcessing) return
      resolver?.(value)
      setResolver(null)
      setOpen(false)
    },
    [isProcessing, resolver],
  )

  const handleConfirm = useCallback(async () => {
    if (isProcessing) return

    if (!state.onConfirm) {
      handleClose(true)
      return
    }

    setIsProcessing(true)
    try {
      await state.onConfirm()
      resolver?.(true)
      setResolver(null)
      setOpen(false)
    } catch {
      // Keep dialog open so the user can retry or cancel.
    } finally {
      setIsProcessing(false)
    }
  }, [handleClose, isProcessing, resolver, state])

  const ConfirmDialog = (): ReactElement =>
    createElement(
      Dialog,
      {
        open,
        onOpenChange: (nextOpen: boolean) => !nextOpen && !isProcessing && handleClose(false),
      },
      createElement(
        DialogContent,
        null,
        createElement(
          DialogHeader,
          null,
          createElement(DialogTitle, null, state.title),
          createElement(DialogDescription, null, state.message),
        ),
        createElement(
          DialogFooter,
          null,
          createElement(
            Button,
            { variant: "outline", onClick: () => handleClose(false), disabled: isProcessing },
            state.cancelLabel,
          ),
          createElement(
            Button,
            { onClick: handleConfirm, disabled: isProcessing },
            isProcessing ? state.loadingLabel : state.confirmLabel,
          ),
        ),
      ),
    )

  return [ConfirmDialog, confirm] as const
}
