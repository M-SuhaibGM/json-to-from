"use client";

import { useEffect, useState } from "react";
import type { FieldOption, FormField } from "../types";

export function useRemoteOptions(field: FormField) {
  const [options, setOptions] = useState<FieldOption[]>(field.options ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no remote fetch is required, ensure static options are up to date
    if (!field.fetchRemote || !field.optionUrl) {
      if (field.options) {
        setOptions(field.options);
      }
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(field.optionUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch options (${res.status})`);
        }
        return res.json();
      })
      .then((data: FieldOption[]) => {
        setOptions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          // Fallback to static options if available on error
          setOptions(field.options ?? []);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [field.fetchRemote, field.optionUrl, field.options]);

  return { options, loading, error };
}