# from rembg import remove
# from PIL import Image
# import sys

# def main():
#     input_path = sys.argv[1]
#     output_path = sys.argv[2]

#     # Open the image file
#     input_image = Image.open(input_path)

#     # Remove the background
#     output_image = remove(input_image)

#     # Save the output image
#     output_image.save(output_path)

# if __name__ == "__main__":
#     main()

from rembg import remove
from PIL import Image
import sys
import os

def main():
    if len(sys.argv) != 3:
        print("Usage: python remove_background.py <input_file> <output_file>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    if not os.path.isfile(input_path):
        print(f"The file {input_path} does not exist.")
        sys.exit(1)

    print(f"Processing {input_path}...")

    try:
        input_image = Image.open(input_path)
        print("Image opened successfully.")

        # Remove the background
        output_image = remove(input_image)


        output_image.save(output_path)
        print(f"Output saved to: {output_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
