import { CreateStoryFormClient as CreateStoryForm } from "@/components/StoryForm";
import { useSearchOption } from "@/hooks/useSearchOption";

export default function Page() {
  const { genders, industries } = useSearchOption();

  return <CreateStoryForm genders={genders} industries={industries} />;
}
