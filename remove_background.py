from rembg import remove
from PIL import Image
import sys

def main():
    input_path = sys.argv[1]
    output_path = sys.argv[2]

    # Open the image file
    input_image = Image.open(input_path)

    # Remove the background
    output_image = remove(input_image)

    # Save the output image
    output_image.save(output_path)

if __name__ == "__main__":
    main()
