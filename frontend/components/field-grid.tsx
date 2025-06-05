"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FieldCard } from "@/components/field-card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockFields } from "@/lib/mock-data";
import { Field } from "@/types/field";

interface FieldGridProps {
  limit?: number;
  fields?: Field[];
}

export function FieldGrid({ limit, fields }: FieldGridProps) {
  const [loading, setLoading] = useState(true);
  const displayFields = fields || (limit ? mockFields.slice(0, limit) : mockFields);

  useEffect(() => {
    // Simulate API call
    const fetchFields = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchFields();
  }, [fields]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(limit || 6).fill(0).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden border bg-card shadow-sm">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayFields.map((field) => (
        <Link key={field.id} href={`/fields/${field.id}`}>
          <FieldCard field={field} />
        </Link>
      ))}
    </div>
  );
}