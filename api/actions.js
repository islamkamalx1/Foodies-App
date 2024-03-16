"use server";

import { redirect } from "next/navigation";
import { saveMeals } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formDate) {
  const meal = {
    title: formDate.get("title"),
    summary: formDate.get("summary"),
    instructions: formDate.get("instructions"),
    image: formDate.get("image"),
    creator: formDate.get("name"),
    creator_email: formDate.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.siz === 0
  ) {
    return { message: "Invalid input." };
  }

  await saveMeals(meal);
  revalidatePath("/meals")
  redirect("/meals");
}
