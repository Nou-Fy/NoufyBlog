export function ProfileStats({
  postsCount,
  commentsCount,
}: {
  postsCount: number;
  commentsCount: number;
}) {
  return (
    /* Changement de flex-col à flex-row */
    /* sm:w-auto permet au bloc de ne pas prendre toute la largeur sur grand écran */
    <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
      <StatCard label="Articles" value={postsCount} color="text-emerald-600" />
      <StatCard
        label="Commentaires"
        value={commentsCount}
        color="text-orange-600"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    /* flex-1 permet aux deux cartes d'avoir exactement la même largeur */
    /* min-w-[120px] évite que les cartes ne deviennent trop petites */
    <div className="flex-1 min-w-[120px] p-4 rounded-3xl bg-stone-50 text-center border border-stone-100">
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
