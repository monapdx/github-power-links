from pathlib import Path

# 1. Set the path to your local GitHub repository folder
# Note: Use a raw string (r"...") so Windows backslashes don't cause errors.
repo_path = r"C:\Users\Admin\Documents\Inbox-Archeology"

# 2. Convert to a Path object
folder = Path(repo_path)

print(f"Searching for .gif files in: {folder}\n")

# 3. Find all .gif files (case-insensitive search for both .gif and .GIF)
# rglob stands for "recursive glob", which searches all sub-folders automatically.
gif_files = list(folder.rglob("*.[gG][iI][fF]"))

# 4. Display the results
if gif_files:
    print(f"Found {len(gif_files)} .gif image(s):")
    for file in gif_files:
        print(file)
else:
    print("No .gif files found.")