import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // data validation
import { PrismaClient } from '@prisma/client';

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  descrption: z.string().min(1),
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 }); // 400 is bad request/invalid data

  // insert new issue in our database
  try {
    // insert new issue in our database
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    });

    return NextResponse.json(newIssue, { status: 201 }); // 201 object was created
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 500 }
    ); // 500 is internal server error
  }
}
