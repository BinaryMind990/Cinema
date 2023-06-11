import { useEffect, useState } from 'react';
import Button from 'components/UI/Button';

const MovieForm = ({ initialData, onSubmit }) => {
	const [movieData, setMovieData] = useState({
		name: '',
		duration: '',
		distributor: '',
		country: '',
		year: '',
		description: '',
		posterLink: '',
		imdbLink: '',
		director: '',
	});

	useEffect(() => {
		if (initialData) {
			setMovieData(initialData);
		}
	}, [initialData]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		onSubmit(movieData);
	};

	return (
		<form className={'form'} onSubmit={handleFormSubmit}>
			<label htmlFor='poster'>Poster</label>
			<input
				type='text'
				name='poster'
				id='poster'
				value={movieData.posterLink}
				onChange={(e) =>
					setMovieData({ ...movieData, posterLink: e.target.value })
				}
			/>
			<label htmlFor='movieName'>Title</label>
			<input
				type='text'
				name='movieName'
				id='movieName'
				value={movieData.name}
				onChange={(e) =>
					setMovieData({ ...movieData, name: e.target.value })
				}
			/>
			<label htmlFor='duration'>Duration</label>
			<input
				type='number'
				name='duration'
				id='duration'
				min={0}
				value={movieData.duration}
				onChange={(e) =>
					setMovieData({ ...movieData, duration: e.target.value })
				}
			/>
			<label htmlFor='distributor'>Distributor</label>
			<input
				type='text'
				name='distributor'
				id='distributor'
				value={movieData.distributor}
				onChange={(e) =>
					setMovieData({ ...movieData, distributor: e.target.value })
				}
			/>
			<label htmlFor='country'>Country</label>
			<input
				type='text'
				name='country'
				id='country'
				value={movieData.country}
				onChange={(e) =>
					setMovieData({ ...movieData, country: e.target.value })
				}
			/>
			<label htmlFor='year'>Year</label>
			<input
				type='number'
				name='year'
				id='year'
				min={0}
				value={movieData.year}
				onChange={(e) =>
					setMovieData({ ...movieData, year: e.target.value })
				}
			/>
			<label htmlFor='description'>Description</label>
			<textarea
				name='description'
				id='description'
				value={movieData.description}
				onChange={(e) =>
					setMovieData({ ...movieData, description: e.target.value })
				}
			/>
			<label htmlFor='imdbLink'>Imdb link</label>
			<input
				type='text'
				name='imdbLink'
				id='imdbLink'
				value={movieData.imdbLink}
				onChange={(e) =>
					setMovieData({ ...movieData, imdbLink: e.target.value })
				}
			/>
			<label htmlFor='director'>Director</label>
			<input
				type='text'
				name='director'
				id='director'
				value={movieData.director}
				onChange={(e) =>
					setMovieData({ ...movieData, director: e.target.value })
				}
			/>

			<Button type='submit' className='blue full-width'>
				Save Movie
			</Button>
		</form>
	);
};

export default MovieForm;
