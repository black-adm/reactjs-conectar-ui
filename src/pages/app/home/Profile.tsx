import { EnvelopeIcon } from "@phosphor-icons/react";
import type { User } from "../../../@types/user";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <div className="text-center">
          <div className="size-24 sm:size-32 bg-gradient-to-b from-green-main to-green-light rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl sm:text-4xl font-bold text-peach-main">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-bold mb-2">
            {user.name}
          </h4>

          <p className="text-gray-light lowercase mb-4">
            @{user.name.replace(" ", "")}
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <EnvelopeIcon className="size-4 text-gray-light" />
              <span className="text-gray-light">{user.email}</span>
            </div>

            <span className="text-xs text-gray-lighter truncate">
              {user?.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}