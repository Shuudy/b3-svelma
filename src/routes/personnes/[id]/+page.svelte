<script>
	import MovieCard from '../../../components/MovieCard.svelte';

    const actor = {
        name: "Naomie Harris",
        profile_path: "/41TVAcYqKKF7PGf3x7QfaLvkLSW.jpg",
        place_of_birth: "Islington, London, England, UK",
        birthday: "1976-09-06",
        gender: 1,
        biography: "Naomie Harris /ˈneɪəmi ˈhæɹɪs/ est une actrice britannique, née le 6 septembre 1976 à Londres.\n\nElle commence sa carrière durant son enfance, apparaissant dans des séries télévisées destinées à la jeunesse.\n\nElle se fait remarquer dans les années 2000 par ses rôles dans des longs métrages tels que 28 jours plus tard, Pirates des Caraïbes : Le Secret du coffre maudit, Miami Vice : Deux flics à Miami et Pirates des Caraïbes : Jusqu'au bout du monde.\n\nDès lors, elle alterne grosses productions et cinéma d'auteur.\n\nElle interprète au côté de Daniel Craig le personnage de Miss Moneypenny dans la saga cinématographique James Bond à compter de Skyfall (2012) et séduit la critique en interprétant Winnie Mandela dans le drame Mandela : Un long chemin vers la liberté (2013).\n\nElle est acclamée par la critique pour son interprétation d'une mère droguée dans le drame Moonlight (2016), qui lui vaut de nombreuses récompenses et citations, notamment pour les Oscars du cinéma, les Golden Globes et les BAFTA Awards.\n\nNée à Londres, Naomi Harris montre très tôt de l’intérêt pour la comédie. Elle entame cependant des études de sciences politiques et sociales à l’université de Cambridge. N’étant pas du tout satisfaite de cette expérience, elle décide de prendre des cours à la prestigieuse Bristol Theatre School de Londres. A partir de 1987, l’actrice décroche des petits rôles à la télévision britannique, que cela soit dans des séries ou dans des téléfilms comme White Teeth.\n\nEn 2002, elle fait ses premiers pas sur grand écran dans Living In Hope de John Miller. Dans cette comédie, elle accompagne un groupe de jeunes étudiants qui font leurs premiers pas à l’université. Mais c’est surtout son rôle dans 28 jours plus tard de Danny Boyle qui la révèle au grand public. Aux côtés de Cillian Murphy dans le rôle de Jim, un coursier tout juste sorti du coma, elle va tenter de survivre tandis que la population de Londres est contaminée par un étrange virus.\n\nC’est à nouveau à un héros sortant du coma qu’elle est confrontée en 2004 dans Trauma. Cette fois-ci, il n’est plus question de contaminés aux tendances violentes mais d’un homme, Colin Firth, qui se tourne vers une médium pour communiquer avec l’esprit de sa femme. Changement radical de registre pour la comédienne en 2006 avec Pirates des Caraïbes : le Secret du Coffre Maudit et sa suite en 2007. Elle y prête ses traits à la sorcière Tia Dalma, qui a le pouvoir de faire revenir Jack Sparrow de l’antre de Davy Jones.\n\nUn an après avoir participé au sombre thriller Au bout de la nuit (2008), la comédienne incarne l’agent Mika Coretti, traquée par le clan Ozunu dans le détonant Ninja Assassin. Forte de cette expérience, elle côtoie à nouveau le monde des agents secrets, et donne même la réplique au plus célèbre d’entre eux dans Skyfall (2012). Elle ajoute ainsi son nom à la longue liste des James Bond Girls en incarnant Eve aux côtés de Daniel Craig.\n\nUn an plus tard, Harris est Winnie Mandela, la seconde épouse du célèbre homme d'Etat sud-africain dans Mandela : Un long chemin vers la liberté. Après deux rôles secondaires dans La Rage au ventre et Un traître idéal, elle livre une performance émouvante en mère toxicomane du héros dans le film oscarisé Moonlight, puis rejoint Dwayne Johnson dans le blockbuster Rampage - Hors de contrôle."
    }

    let biographyParagraphs = actor.biography.split('\n\n');

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    }

    let formattedBirthday = formatDate(actor.birthday);
</script>

<div class="actor-details__container">
	<div class="actor-details">
		<div class="actor-details__left">
			<div class="actor-details__image">
				<img
					src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
					alt=""
				/>
			</div>

			<div class="actor-details__personalinfo">
				<div class="actor-details__personalinfo-title">Informations personnelles</div>
				<div class="actor-details__personalinfo-items">
					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Lieu de naissance</div>
						<div class="actor-details__personalinfo-item-value">
							{actor.place_of_birth}
						</div>
					</div>

					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Genre</div>
						<div class="actor-details__personalinfo-item-value">{actor.gender === 1 ? 'Femme' : 'Homme'}</div>
					</div>

					<div class="actor-details__personalinfo-item">
						<div class="actor-details__personalinfo-item-title">Célèbre pour</div>
						<div class="actor-details__personalinfo-item-value">Acting</div>
					</div>
				</div>
			</div>
		</div>
		<div class="actor-details__right">
			<div class="actor-details__infos">
				<div class="actor-details__infos-name">{actor.name}</div>
				<div class="actor-details__infos-birthday">Né(e) le {formattedBirthday}</div>
			</div>
			<div class="actor-details__biography">
				<div class="actor-details__biography-title">Biographie</div>
				<div class="actor-details__biography-text">
                    {#each biographyParagraphs as paragraph, index}
                        <p style="margin-top: {index === 0 ? '0' : ''}">{paragraph}</p>
                    {/each}
				</div>
			</div>
		</div>
	</div>

	<div class="actor-details__movies">
		<div class="actor-details__movies-title">Filmographie</div>
		<div class="actor-details__movies-list">
			{#each Array(4) as _, index}
				<MovieCard
					key={index}
					id="2"
					title="Movie title"
					year="2024"
					vote_average="5,4"
					poster_path="/ceG9VzoRAVGwivFU403Wc3AHRys.jpg"
				/>
			{/each}
		</div>
	</div>
</div>
