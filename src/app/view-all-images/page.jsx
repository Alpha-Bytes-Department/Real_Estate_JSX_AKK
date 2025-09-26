'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ViewAllImage() {
    return (
        <div className="flex flex-wrap gap-3">
            <Image src={"/Image/view-all-IMAges/view-all-1-horizontal.jpg"} alt="1" height={100} width={800} className="h-full w-full"/>
            <Image src={"/Image/view-all-IMAges/view-all-square-1.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-all-square-1.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-image-vertical.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-all-1-horizontal.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-all-1-horizontal.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-all-1-horizontal.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-all-1-horizontal.jpg"} alt="1" height={300} width={800} />
            <Image src={"/Image/view-all-IMAges/view-all-1-horizontal.jpg"} alt="1" height={300} width={800} />
        </div>
    );
}


