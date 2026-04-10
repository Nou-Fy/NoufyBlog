import { Mail, Calendar } from "lucide-react";
import { AvatarUpload } from "./avatar-upload";
import { ProfileDetailsModal } from "./ProfileDetails";
import { LogoutButton } from "./LogoutButton";

export function ProfileHeader({ user }: { user: any }) {
  return (
    <div className="bg-card border-b border-border pt-8 pb-12 shadow-sm px-4 rounded-[2rem] border-none shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <AvatarUpload
          userId={user.id}
          defaultInitial={user.nom.charAt(0)}
          currentAvatar={user.avatar}
        />

        <div className="flex-1 text-center md:text-left space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-200 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
            {user.role}
          </span>
          <h1 className="text-4xl font-black text-foreground">
            {user.prenom} {user.nom}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-orange-500" /> {user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <ProfileDetailsModal user={user} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
