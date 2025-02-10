import os
import re

def rename_images(folder_path):
    # 获取文件夹中的所有文件
    files = os.listdir(folder_path)
    
    # 过滤出图片文件（支持常见图片格式）
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    images = [f for f in files if os.path.splitext(f)[1].lower() in image_extensions]
    
    # 找出已有的数字命名的图片
    existing_numbers = []
    for image in images:
        match = re.match(r'^(\d+)\.(jpg|jpeg|png|gif|bmp|webp)$', image, re.IGNORECASE)
        if match:
            existing_numbers.append(int(match.group(1)))
    
    # 如果没有数字命名的图片，从1开始
    if not existing_numbers:
        start_number = 1
    else:
        start_number = max(existing_numbers) + 1
    
    # 对不符合数字命名的图片进行重命名
    renamed_count = 0
    for image in images:
        match = re.match(r'^(\d+)\.(jpg|jpeg|png|gif|bmp|webp)$', image, re.IGNORECASE)
        if not match:
            file_extension = os.path.splitext(image)[1]
            new_name = f"{start_number}{file_extension}"
            os.rename(os.path.join(folder_path, image), os.path.join(folder_path, new_name))
            print(f"Renamed '{image}' to '{new_name}'")
            start_number += 1
            renamed_count += 1
    
    print(f"Total {renamed_count} images renamed.")

# 使用示例
folder_path = "D:/blog/harryBlog/source/assets/bg"  # 替换为你的文件夹路径
rename_images(folder_path)