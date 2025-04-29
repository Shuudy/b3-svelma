<script>
    let { id, profile_path, name, role } = $props();

    const defaultProfile = '/default-profile.svg';
</script>

<a href={`/personnes/${id}`} class="actor-card">
    <div class="actor-card__image">
        <img src={profile_path ? `https://image.tmdb.org/t/p/original/${profile_path}` : defaultProfile} alt={name} />
    </div>
    <div class="actor-card__infos">
        <div class="actor-card__name">{name}</div>
        <div class="actor-card__role">{role}</div>
    </div>
</a>

