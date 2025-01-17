import PropTypes from 'prop-types';

const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col justify-center items-center sm:mt-10">
      <label className="sm:text-h3 text-h4 text-center w-[100%] font-medium text-neutral-13">De quel type de formule s&apos;agit-il ?</label>
      <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Choisissez un type</p>
      <div className="flex flex-col gap-6">
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.type === 'Confort' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300 text-neutral-13'
          } w-[380px] md:w-[800px] md:h-auto`}
          style={{ height: 'auto' }}
        >
          <div className="ml-2">
            <h1 className="font-bold sm:text-h4 font-plus-jakarta text-[28px]">Confort</h1>
            <p className={`text-body-large font-medium font-plus-jakarta ${formData.type === 'Confort' ? 'text-secondary-6' : 'text-neutral-13'}`}>5 étoiles</p>
          </div>
          <input
            type="radio"
            name="type"
            value="Confort"
            checked={formData.type === 'Confort'}
            onChange={handleChange}
            className={` ${formData.type === 'Confort' ? 'checked:secondary-6' : ''}  text-secondary-6 w-6 h-6`}
          />
        </label>
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.type === 'Essentiel' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300 text-neutral-13'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: 'auto' }}
        >
          <div className="ml-2">
            <h1 className="font-bold sm:text-h4 font-plus-jakarta text-[28px]">Essentiel</h1>
            <p className={`text-body-large font-medium font-plus-jakarta ${formData.type === 'Essentiel' ? 'text-secondary-6' : 'text-neutral-13'}`}>4 étoiles</p>
          </div>
          <input
            type="radio"
            name="type"
            value="Essentiel"
            checked={formData.type === 'Essentiel'}
            onChange={handleChange}
            className={`form-radio ${formData.type === 'Essentiel' ? 'checked:bg-primary-6' : ''} text-secondary-6 w-6 h-6`}
          />
        </label>
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.type === 'Eco' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300 text-neutral-13'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: 'auto' }}
        >
          <div className="ml-2">
            <h1 className="font-bold sm:text-h4 font-plus-jakarta text-[28px]">Eco</h1>
            <p className={`text-body-large font-medium font-plus-jakarta ${formData.type === 'Eco' ? 'text-secondary-6' : 'text-neutral-13'}`}>3 étoiles</p>
          </div>
          <input
            type="radio"
            name="type"
            value="Eco"
            checked={formData.type === 'Eco'}
            onChange={handleChange}
            className={`form-radio ${formData.type === 'Eco' ? 'checked:bg-primary-6' : ''} text-secondary-6 w-6 h-6`}
          />
        </label>
      </div>
    </div>
  );
};

// Prop type validation
Step1.propTypes = {
  formData: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step1;