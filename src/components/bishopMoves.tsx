'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";



function findBishopMoves(A: number, B: number): number {
    // Moves are along diagonals: ↖ ↗ ↘ ↙
    // Count possible squares in each diagonal direction

    const topLeft = Math.min(A - 1, B - 1);
    const topRight = Math.min(A - 1, 8 - B);
    const bottomLeft = Math.min(8 - A, B - 1);
    const bottomRight = Math.min(8 - A, 8 - B);

    return topLeft + topRight + bottomLeft + bottomRight;
}
const formSchema = z.object({
    xPos: z.number().min(1, 'X position can not be less than 1').max(8, 'X position can not be greater than 8'),
    yPos: z.number().min(1, 'Y position can not be less than 1').max(8, 'Y position can not be greater than 8'),
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
};
export default function BishopMoves() {
    const [a, setA] = useState<number | string>('');
    const [b, setB] = useState<number | string>('');
    const [result, setResult] = useState<number | null>(null);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            xPos: "",
            yPos: ""
        }

    });



    return (
        <Card >
            <CardHeader>
                <CardTitle>Bishop Moves</CardTitle>
                <CardDescription>How a bishop can move from a selected position</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="xPos"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> X Position </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter any number 1-8 ..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="yPos"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Y Position</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter any number 1-8 ..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )

                            }
                        />

                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button type="submit">Submit</Button>

            </CardFooter>

        </Card >

    );
}
