<script>
    let { id, profile_path, name, role } = $props();
</script>

<a href={`/personnes/${id}`} class="actor-card">
    <div class="actor-card__image">
        <img src={`https://image.tmdb.org/t/p/original/${profile_path}`} alt={name} />
    </div>
    <div class="actor-card__infos">
        <div class="actor-card__name">{name}</div>
        <div class="actor-card__role">{role}</div>
    </div>
</a>