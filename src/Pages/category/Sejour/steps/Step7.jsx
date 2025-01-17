import PropTypes from 'prop-types';

const Step7 = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col items-center md:px-0 px-4 sm:mt-4">
      <div className="text-center">
        <h1 className="sm:text-h2 text-h5 font-bold text-[#2D3C59] font-plus-jakarta">Mettez en valeur votre annonce avec une description soignée</h1>
        <p className="py-4 font-plus-jakarta font-medium text-[#667085]">
          Les descriptions courtes sont généralement les plus efficaces
        </p>
      </div>
      <div className="w-[380px] sm:w-[360px]  md:w-[800px]">
        <label className="block text-sm font-bold text-neutral-13">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full h-44 p-4 rounded-lg shadow-sm border-gray-300"
          placeholder="Enter une description..."
          maxLength="400"
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {formData.description.length}/400
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Step7.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step7;